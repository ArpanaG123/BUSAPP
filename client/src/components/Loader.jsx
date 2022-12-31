import React from 'react'
import '../resources/global.css'

function Loader() {
  
  return (
    <div className='spinner-parent'>
        <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>
    </div>
  )
}

export default Loader;