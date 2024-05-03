import React from 'react'
import "./OrderSuccess.css"
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <>
      
      <div className='OrderSuccess'>

        <CheckCircleIcon/>
        <Typography>Your Order has been Placed !</Typography>
        <Link to="/orders/Myorder">View Orders</Link>
      </div>
    

    </>
  )
}

export default OrderSuccess