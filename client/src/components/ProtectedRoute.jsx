import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../redux/usersSlice';
import { HideLoading } from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';

function ProtectedRoute({children}) {
    const dispatch = useDispatch()
    const {loading} = useSelector((state) => state.alerts);
    const navigate = useNavigate();

    const validateToken = async() => {
        try {
            const response = await axios.post('/api/users/get-user-by-id',
            {},
            {
                headers : {
                    Authorization :`Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(HideLoading())
            if(response.data.success){
                dispatch(setUsers(response.data.data))
            }else{
                localStorage.removeItem("token");
                message.error(response.data.message);
                navigate("/login")
            }
            
        } catch (error) {
            dispatch(HideLoading())
            localStorage.removeItem("token");
            message.error(error.message)
            navigate("/login")  
        }
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            validateToken();
        }else{
            navigate("/login")
        }
    },[])

  return (
    <div>{!loading && <DefaultLayout>{children}</DefaultLayout>}</div>
  )
}

export default ProtectedRoute