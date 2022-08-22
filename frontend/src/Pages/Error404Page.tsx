import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Error404Page() {
    const navigate = useNavigate();
  return (
    <div className='fullscreen center-all black-bg'>
        <h2>Error 404</h2>
        <h3>Page not Found</h3>
        <button onClick={()=>{navigate('/home')}} className='blue-button'>
            Return
        </button>
    </div>
  )
}
