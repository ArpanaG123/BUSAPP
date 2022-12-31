import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BusForm from '../../components/BusForm';
import PageTitle from '../../components/PageTitle'
import { axiosInstance } from '../../helpers/axiosInstance';
import { HideLoading } from '../../redux/alertsSlice';
import '../../resources/Layout.css';


function AdminBuses() {
  
  const dispatch  = useDispatch();
  const[showBusForm,setShowBusForm] = useState(false);
  const[buses,setBuses] = useState([]);

  const getBuses = async() => {
    try {
      const response = await axiosInstance.post('https://shy-pear-trout-ring.cyclic.app/api/buses/get-all-buses',{});
      dispatch(HideLoading());
      if(response.data.success){
        setBuses(response.data.data)
      }else{
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

  const columns = [
    {
      title:"name",
      dataIndex:"name"
    },
    {
      title:"number",
      dataIndex:"number"
    },
    {
      title:"from",
      dataIndex:"from"
    },
    {
      title:"to",
      dataIndex:"to"
    },
    {
      title:"journey Date",
      dataIndex:"journeyDate",
    },
    {
      title:"status",
      dataIndex:"status"
    },
  ]



  return (
    <div>
        <div className="d-flex justify-content-between">
            <PageTitle title = "Buses" />
            <button className='primary-btn' onClick={() => setShowBusForm(true)}>Add Bus</button>
        </div>
        <Table columns={columns}dataSource = {buses} />

        {showBusForm && <BusForm  showBusForm={showBusForm} setShowBusForm = {setShowBusForm} />}
    </div>
  )
}

export default AdminBuses;