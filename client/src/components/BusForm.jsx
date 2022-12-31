import React from 'react'
import { Modal,Form,Col,Row, message } from 'antd'
import '../resources/Layout.css';
import FormItem from 'antd/es/form/FormItem'
import { HideLoading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';
import { useDispatch } from 'react-redux'
import '../resources/global.css';

function BusForm({
    showBusForm,setShowBusForm,type = "add"}) {
        const dispatch = useDispatch();
    const onFinish = async(values) => {
        try {
            //dispatch(showLoading())
            let response = null;
            if(type === "add"){
                response = await axiosInstance.post('https://shy-pear-trout-ring.cyclic.app/api/buses/add-bus',values)
            }else{

            }
            if(response.data.success){
                message.success(response.data.message);
            }
            else{
                message.error(response.data.message)
            }
            dispatch(HideLoading())
            
        } catch (error) {
            message.error(error.message)
            dispatch(HideLoading()) 
        }
    }
  return (
    <Modal width={700} title = 'Add Bus' open = {showBusForm} onCancel = {() => setShowBusForm(false)} footer = {false}>
        <Form layout='vertical' onFinish={onFinish}>
        <Row gutter={[10,10]}>
                <Col lg = {100} xs = {24}>
                    <FormItem label = "BUS NAME" name = "name">
                        <input type="text" />
                    </FormItem>
                </Col>
                <Col lg = {12} xs = {24}>
                    <FormItem label = "BUS NUMBER" name = "number">
                        <input type="text" />
                    </FormItem>
                </Col>
                <Col lg = {12} xs = {24}>
                    <FormItem label = "CAPACITY" name = "capacity">
                        <input type="text" />
                    </FormItem>
                </Col>
                <Col lg = {12} xs = {24}>
                    <FormItem label = "FROM" name = "from">
                        <input type="text" />
                    </FormItem>
                </Col>
                <Col lg = {12} xs = {24}>
                    <FormItem label = "TO" name = "to">
                        <input type="text" />
                    </FormItem>
                </Col>
                <Col lg = {8} xs = {24}>
                    <FormItem label = "JOURNEY DATE" name = "journeyDate">
                        <input type="date" />
                    </FormItem>
                </Col>
                <Col lg = {8} xs = {24}>
                    <FormItem label = "DEPARTURE" name = "departure">
                        <input type="time" />
                    </FormItem>
                </Col>
                <Col lg = {8} xs = {24}>
                    <FormItem label = "ARRIVAL" name = "arrival">
                        <input type="time" />
                    </FormItem>
                </Col>
                <Col lg = {12} xs = {24}>
                    <FormItem label = "TYPE" name = "type">
                        <select name = " " id = " ">
                            <option value = "select">Select</option>
                            <option value = "AC">AC</option>
                            <option value = "NON-AC">NON-AC</option>
                        </select>
                    </FormItem>
                </Col>
                <Col lg = {12} xs = {24}>
                    <FormItem label = "PRICE" name = "price">
                        <input type="text" />
                    </FormItem>
                </Col>
                <Col lg = {24} xs = {24}>
                    <Form.Item label = "Status" name = "status">
                        <select name = " " id = "">
                            <option value = "select">Select</option>
                            <option value = "Yet to start">Yet To Start</option>
                            <option value = "Running">Running</option>
                            <option value = "Completed">Completed</option>
                        </select>

                    </Form.Item>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                <button type = "submit" className='save-btn'>SAVE</button>
            </div>
        </Form>
    </Modal>
  )
}

export default BusForm