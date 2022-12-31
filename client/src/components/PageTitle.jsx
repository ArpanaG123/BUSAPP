import React from 'react'
import '../resources/Layout.css';

function PageTitle({title}) {
  
  return (
    <div>
        <h1 className='text-xl'>{title}</h1>
    </div>
  )
}

export default PageTitle;