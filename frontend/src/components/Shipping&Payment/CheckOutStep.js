import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React from 'react'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

import "./CheckOutStep.css"

const CheckOutStep = ({activestep}) => {

    const steps=[
        {
            label:<Typography>Shipping Details</Typography>,
            Icon:<LocalShippingIcon/>,
        },
        {
            label:<Typography>Confirm Order</Typography>,
            Icon:<LibraryAddCheckIcon/>,
        },
        {
            label:<Typography>Payment</Typography>,
            Icon:<AccountBalanceIcon/>,
        }
    ]

    const stepstyle={
        boxSizing:"border-box"
    }



    //Here the Step component of material UI has classname => MuiStepConnector-line , MuiStepConnector-root , MuiStepConnector-active , MuiStepConnector-completed

  return (
    <>
    <Stepper className='stepperDiv' alternativeLabel activeStep={activestep} style={stepstyle}>

        {
            steps.map((item,index)=>{
              return <Step key={index}  >
              <StepLabel
              style={{color:`${activestep>index?"green":(activestep===index?"tomato":"")}`}} icon={item.Icon}>{item.label}</StepLabel>
           </Step>
            })
        }

    </Stepper>
    </>
  )
}

export default CheckOutStep