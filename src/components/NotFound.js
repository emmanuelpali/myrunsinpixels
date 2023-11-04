import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <>
        <button className="btn btn-link mb-5" onClick={() => navigate(-1)}>Back</button>
        <div className='d-flex justify-content-center align-items-center'>
            <h1>The resource you are looking for does not exists</h1>
        </div>
    </>
  )
}

export default NotFound