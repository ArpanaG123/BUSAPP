import { Col, message, Row } from 'antd';
import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading } from '../redux/alertsSlice';
import '../resources/bus.css';

function BookNow() {
  
  const[selectedSeats,setSelectedSeats] = useState([])
  const params = useParams();
  const dispatch = useDispatch();
  const[bus,setBus] = useState(null);

  const getBus = async() => {
    try {
      const response = await axiosInstance.post('/api/buses/get-bus-by-id',{
        _id:params.id,
      });
      dispatch(HideLoading())
      if(response.data.success){
        setBus(response.data.data)
      }else{
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message)
    }
  }

  const bookNow = async() => {
    try {
      const response = await axiosInstance.post("/api/bookings/book-seat",{
        bus:bus._id,
        seats : selectedSeats,
      });
      dispatch(HideLoading());
      if(response.data.success){
        message.success(response.data.message);
      }else{
        message.error(response.data.message)
      }
      
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getBus()
  },[]);

  return (
    <div>
      {bus && (
        <Row className='mt-5' gutter={[40]}>
        <Col lg = {12} xs = {24} sm = {24}>
          <h3 className='text-lg'>{bus.name}</h3>
          <h5 className='text-md'>{bus.from} - {bus.to}</h5>
          <hr/>
          <div className='flex flex-col gap-1'>
            <p><b>Journey Date</b> : {bus.journeyDate}</p>
            <p><b>Price</b> : ${bus.price}/-</p>
            <p><b>Departure Time</b> : {bus.departure}</p>
            <p><b>Arrival Time</b> : {bus.arrival}</p>
            <hr/>
            <p><b>Capacity</b> : {bus.capacity}</p>
            <p><b>Seat Left</b> : {bus.capacity - bus.seatsBooked.length}</p>
          </div>
          <hr/>
          <div className='flex flex-col gap-1'>
            <h4 className='text-lg'>
              <b>Selected Seat</b> : {selectedSeats.join(",")}
            </h4>
            <h5>Amount : <b>{bus.price * selectedSeats.length} </b></h5>
            <button className={`booknowBtn ${selectedSeats.length === 0 && "disabled-booknowBtn"}`} onClick={bookNow} 
            disabled = {selectedSeats.length === 0}>Book Now</button>

          </div>
        </Col>
        <Col lg = {12} xs = {24} sm = {24}>
          <SeatSelection  selectedSeats = {selectedSeats} 
          setSelectedSeats = {setSelectedSeats} bus = {bus}/>
        </Col>
      </Row>
      )}
    </div>
  )
}

export default BookNow