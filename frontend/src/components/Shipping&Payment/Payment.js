import React,{useRef,useEffect} from 'react'
import { useAlert } from 'react-alert';
import { useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router'
import CheckOutStep from './CheckOutStep'

import { Typography } from '@material-ui/core';
import axios from 'axios';
import "./payment.css"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"

//CardNumberElement is similar to input tag but it automatically checks whether input is 16digits or not
import {CardNumberElement , CardCvcElement,useStripe,useElements,CardExpiryElement} from "@stripe/react-stripe-js"




import { Clear_Error,CreateOrder } from '../../Redux_Actions/OrderAction';


const Payment = () => {

  const Navigate = useNavigate();
  const Alert =useAlert()

  const dispatch = useDispatch()

  const stripe = useStripe();

  const elements = useElements();

  const PayBtn=useRef(null)

  const {cartItems,ShippingInfo} = useSelector(state=>state.cart);

  const {loading,user,isAuthenticated} =useSelector(state=>state.loginUser)






const {error}=useSelector(state=>state.newOrder);


const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

console.log(ShippingInfo,user,orderInfo)

//Creating Order

const Order ={
  shippingInfo:ShippingInfo,
  OrderItem:cartItems,
  paymentInfo:orderInfo,
  ItemPrice:orderInfo.subtotal,
  taxPrice:orderInfo.tax,
  ShippingPrice:orderInfo.shippingCharges,
  TotalPrice:orderInfo.Total,

}







  const PaymentData = {
     amount:Math.round(orderInfo.Total)*100
  }


  

  const PaymentHandler=async(e)=>{
    alert('payment click')

    e.preventDefault();

    PayBtn.current.disabled=true;

    

    try{

       const {data} = await axios.post('/api/v1/process/payment',PaymentData)

      console.log("Here is PaymentData: ",data)

       const client_secret = data.client_secret;

      //  alert(client_secret)

       if(!stripe || !elements)
       {
        
        // here stripe will check whether the website is connected with STRIPE PAYMENT SERVER or not
        
        // here 'elements' will have all the input cardelements details given as input is present or not

        console.log("missing element or stripe")
        return;
       }

       const result = await stripe.confirmCardPayment(client_secret,{
        payment_method:{
          card:elements.getElement(CardNumberElement),
          billing_details:{
            name:user.name,
            email:user.email,
            address:{
              line1:ShippingInfo.Address,
              city:ShippingInfo.City,
              state:ShippingInfo.state,
              postal_code:ShippingInfo.pincode,
              country:ShippingInfo.country
            },

          },
        },
       })

       console.log(result)

       alert(result);


       if(result.error)
       {
            PayBtn.current.disabled=false;
            Alert.error(result.error.message)
       }
       else
       {
            if(result.paymentIntent.status=="succeeded")
            {

                 
              //Here after successful payment the order will be placed first:

              Order.paymentInfo={
                id:result.paymentIntent.id,   //Transaction ID
                status:result.paymentIntent.status,
              }


              console.log("Placing Order after Successful Payment: ");

              // Not Working Dispatch
              dispatch(CreateOrder(Order));



            
              Alert.success('Payment Success');
              Navigate("/success")
              
            }
            else
            Alert.error("There is issue in Payment Processing !")
       }




    }catch(error)
    {
      alert(`Error: ${error.response.data.message}`)
      PayBtn.current.disabled=false;

    }

  }


  useEffect(() => {

    if(error)
    {
      Alert.error(error)
    }
   
  }, [dispatch,error,Alert])
  

  

  

  return (
    <>
    <CheckOutStep activestep={2} />
    <div className='paymentContainer'>
      <form className='paymentForm' onSubmit={PaymentHandler}>

        <Typography>CARD INFO</Typography>
        <div>
          <CreditCardIcon/>
          <CardNumberElement className='paymentInput'/>
        </div>

        <div>
          <VpnKeyIcon/>
          <CardCvcElement className='paymentInput'/>
        </div>

        <div>
          <EventIcon/>
          <CardExpiryElement className='paymentInput'/>
        </div>

        <input
        type="submit"
        value={`Pay Rs:${orderInfo&&orderInfo.Total}`}
        ref={PayBtn}
        className="PaymentFormBTN"
        
        />

      </form>
    </div>
    </>
  )
}

export default Payment