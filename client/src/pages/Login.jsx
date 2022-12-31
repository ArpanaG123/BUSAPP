import React from 'react'
import "../resources/global.css";
import { Link, useNavigate } from "react-router-dom";
import {Form,message} from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { HideLoading, showLoading } from '../redux/alertsSlice';

function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async(values) => {
        try {
          dispatch(showLoading());
            const response = await axios.post("https://shy-pear-trout-ring.cyclic.app/api/users/login",values);
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                localStorage.setItem("token",response.data.data);
                navigate('/');
                alert("After loggedIn successfully,Please Refresh Once");
            }else{
                message.error(response.data.message)
            } 
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message) 
        }
    }
    
  return (
    <>
    <h2 className='busTitle'>Welcome To Appy Bus</h2>
    <div className="register">
      <div>
        <img
          src="https://png.pngtree.com/background/20220716/original/pngtree-illustration-form-registration-appointment-medical-life-background-design-picture-image_1645287.jpg"
          alt=""
          className="registerImage"
        />
      </div>
      <div className="loginForm">
        <h3 className="signupHead">LOGIN</h3>
        <Form onFinish={onFinish}>
          <Form.Item label = "Email" name = "email" className='emaiLoginlLabel'>
            <input type="email" placeholder="Enter Your Email" className="emailLoginInput"/>
          </Form.Item>
          <br />
          <Form.Item label = "Password" name="password" className = "passLoginLabel">
            <input type="password" placeholder="Enter Password" className="passLoginInput" />
          </Form.Item>
          <br />
          <div>
            <Link to = '/register' className="Registering">Click Here To Register</Link>
            <button type="submit" className="loginButton">Login</button>
          </div>
        </Form>
      </div>
    </div>
    </>
  );
}


export default Login