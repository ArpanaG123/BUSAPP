import { Col, message, Row } from 'antd';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Bus from '../components/Bus';
import { axiosInstance } from '../helpers/axiosInstance';
import { HideLoading } from '../redux/alertsSlice';
import '../resources/bus.css'

function Home(){
  const dispatch  = useDispatch();
  const[buses,setBuses] = useState([]);
  const[filters = {},setFilters] = useState({})

  const getBuses = async() => {
     const tempFilters = { }
     Object.keys(filters).forEach((key) => {
      if(filters[key]){
        tempFilters[key] = filters[key];
      }
     })
    try {
      const response = await axiosInstance.post('https://shy-pear-trout-ring.cyclic.app/api/buses/get-all-buses',filters);
      dispatch(HideLoading());
      if(response.data.success){
        setBuses(response.data.data)
      }
      else{
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading());
      //message.error(error.message)
    }
  }

  useEffect(() => {
    getBuses()
  },[])
  return (
    <div>
      <div className='my-4 card p-2'>
        <Row gutter={[10]}>
          <Col lg = {6} sm = {24}>
            <input type = "text" 
            placeholder='From'
            value = {filters.from}
            onChange = {(e) => setFilters({...filters,from:e.target.value})}/>
          </Col>
          <Col lg = {6} sm = {24}>
            <input type = "text" 
            placeholder='To'
            value = {filters.to}
            onChange = {(e) => setFilters({...filters,to:e.target.value})}/>
          </Col>
          <Col lg = {6} sm = {24}>
            <input type = "date" 
            placeholder='Date'
            value = {filters.journeyDate}
            onChange = {(e) => setFilters({...filters,date:e.target.value})}/>
          </Col>
          <Col lg = {3} sm = {24}>
          <button className='serachButton' onClick={() => getBuses()}>Filter</button>
          </Col>
          <Col lg = {3} sm = {24}>
          <button className='claerButton'>Clear</button>
          </Col>
        </Row>

      </div>
      <div>
        <Row>
          {
            buses.map(bus => (
              <Col lg={12} xs = {24}>
               <Bus bus = {bus}  />
              </Col>
            ))
          }
        </Row>
      </div>
    </div>
  )
}

export default Home