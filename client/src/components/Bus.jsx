import React from 'react'
import {useNavigate} from 'react-router-dom'
import '../resources/bus.css';

function Bus({bus}) {
    const navigate = useNavigate();

  return (
    <div className='card p-2'>
        <h3 className='text-lg nameingBus'>{bus.name}</h3>
        <hr className='horizontal'/>
        <div className='d-flex justify-content-between'>
            <div>
                <p className='text-sm'>From</p>
                <p className='text-sm fromBus'>{bus.from}</p>
            </div>
            <div>
                <p className='text-sm'>To</p>
                <p className='text-sm fromBus'>{bus.to}</p>
            </div>
            <div>
                <p className='text-sm'>Price</p>
                <p className='text-sm pricebus'>${bus.price}/-</p>
            </div>
        </div>
        <div className='d-flex justify-content-between align-items-end'>
            <div><hr/>
                <p className='text-sm'>Journey Date</p>
                <p className='text-sm journing'>{bus.journeyDate}</p>
            </div>
            <p className='text-lg underline' onClick={() => {navigate(`/book-now/${bus._id}`)}}><button className='bookButton'>Book Now</button></p>
        </div>
    </div>
  )
}

export default Bus