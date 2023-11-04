import React, { useContext } from 'react'
import Card from './Card'
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from '../context/milesandpixelsContext';

const SingleRun = () => {
    const navigate = useNavigate()
    const { state } = useContext(Context)
    const { state: routerState } = useLocation()
    const run = state.items.find(item => item.id === routerState.id)
  return (
    <>
        <button className="btn btn-link" onClick={() => navigate(-1)}>Back</button>
        <div className="d-flex justify-content-center mb-5">
            <Card {...run}/>
        </div>
    </>
  )
}

export default SingleRun