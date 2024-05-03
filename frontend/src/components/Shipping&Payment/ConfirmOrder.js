import { Typography } from "@material-ui/core";
import React from "react";
import CheckOutStep from "./CheckOutStep.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ConfirmOrder.css"
import { State } from "country-state-city";
import GeneralProductIcon from "../../Generic User Icon.png"

const ConfirmOrder = () => {

    const {cartItems,ShippingInfo} = useSelector(state=>state.cart);

    const {user} = useSelector(state=>state.loginUser)

    const Navigate = useNavigate()

    const AllStatesOfCountryChosen = State.getStatesOfCountry(ShippingInfo.country);
    console.log(AllStatesOfCountryChosen)

    //  const FullAddress = ShippingInfo.Address+", " + ShippingInfo.City + ", "+ AllStatesOfCountryChosen[ShippingInfo.state].name + ", " + ShippingInfo.country

    const FullAddress="ad"

    console.log(user)

   

    const subtotal = cartItems.reduce((acc,item)=>acc + item.quantity*item.price,0)

    const shippingCharges = subtotal>1000 ? 0:(subtotal===0 ? 0:200)

    const tax = subtotal*0.18

    const Total = tax + shippingCharges + subtotal


    const ProcessPayment=()=>{

      const paymentData = {
        subtotal,
        shippingCharges,
        tax,
        Total,

      }

      console.log(paymentData)
      sessionStorage.setItem("orderInfo",JSON.stringify(paymentData))

      Navigate("/process/payment")
    }

  return (
    <>
      <CheckOutStep activestep={1} />
      <div className="ConfirmOrder">
        <div className="ProductSummarySide">
          
          <div className="ShippingArea">
            <Typography style={{font:"300 1.5vmax Roboto"}}>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name :</p>
                <span>{user.name}</span>
              </div>

              <div>
                <p>Full Address :</p>
                <span>{FullAddress}</span>
              </div>

              <div>
                <p>Phone Number :</p>
                <span>{ShippingInfo.Phone}</span>
              </div>

              <div>
                <p>PinCode :</p>
                <span>{ShippingInfo.pincode}</span>
              </div>

            </div>
          </div>


          <div className="confirmCartItems">

            <Typography>Your Cart Items : </Typography>
            <div className="confirmCartItemContainer">

                {
                    cartItems&&cartItems.map((item)=>{
                        return <>
                        <div key={item.productID}>

                             <img src={GeneralProductIcon} alt={item.name} target="_blank"/>
                            <Link tag="a" to={`/products/${item.productID}`}   >{item.name}</Link>
                            <span>
                                {item.price} <b>X</b> {item.quantity} = 
                                <b> Rs {item.quantity * item.price}</b>
                            </span>
                             
                        </div>
                        </>
                    })
                }

            </div>

          </div>


          

        </div>

        <div className="OrderSummary">
          
          <Typography>Order Summary</Typography>
          <div >
            <div>
              <p>SubTotal</p>
              <span>Rs {subtotal}</span>
            </div>

            <div>
              <p>Shipping Charges</p>
              <span>{shippingCharges}</span>
            </div>

            <div>
              <p>GST : </p>
              <span>Rs {tax}</span>
            </div>
          </div>


          <div className="OrderSummaryTotal">

            <p>Total:</p>
            <span>Rs {Total}</span>

          </div>

          <button onClick={ProcessPayment}>Proceed To Payment</button>

        </div>
        
      </div>
    </>
  );
};

export default ConfirmOrder;
