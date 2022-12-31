import React from "react";
import "../resources/global.css";
import { Link } from "react-router-dom";
import { Form, message } from "antd";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { HideLoading } from "../redux/alertsSlice";


function Register(){
    const dispatch = useDispatch();
    const onFinish = async(values) => {
        try {
            const response = await axios.post("/api/users/register",values);
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
            }else{
                message.error(response.data.message)
            } 
        } catch (error) {
            dispatch(HideLoading());
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
      <div className="formPage">
        <h3 className="signupHead">SIGN UP</h3>
        <Form onFinish={onFinish}>
          <Form.Item label = "Name" name="name" className="nameLabel">
            <input type="text" placeholder="Enter Your Name" className="nameInput" />
          </Form.Item>
          <br />
          <Form.Item label = "Email" name = "email" className="emailLabel" >
            <input type="email" placeholder="Enter Your Email" className="emailInput"/>
          </Form.Item>
          <Form.Item label = "Password" name="password" className="passLabel">
            <input type="password"  placeholder="Enter Password" className="passInput" />
          </Form.Item>
          <br />
          <div>
            <Link to = '/login' className="loginPage">Click Here To Login</Link>
            <button type="submit" className="registerButton">Register</button>
          </div>
        </Form>
      </div>
    </div>
</>
  );
}

export default Register;
