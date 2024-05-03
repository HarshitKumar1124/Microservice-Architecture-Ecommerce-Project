import React, { useState } from 'react'
import "./Shipping.css"
import {Country,State} from "country-state-city"
import PinDropIcon from "@material-ui/icons/PinDrop"
import LocationCityIcon from "@material-ui/icons/LocationCity"
import PhoneIcon from "@material-ui/icons/Phone"
import HomeIcon from "@material-ui/icons/Home"
import PublicIcon from "@material-ui/icons/Public"
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import TransferWithInAStationIcon from "@material-ui/icons/TransferWithinAStation"
import CheckOutStep from "./CheckOutStep.js"
import {SaveShippingInfo} from "../../Redux_Actions/CartAction"
import { useNavigate } from 'react-router'


const Shipping = () => {

    const dispatch=useDispatch();
    const Alert = useAlert();
    const Navigate = useNavigate();

    const {ShippingInfo} = useSelector(state=>state.cart);

    const [Address,setAddress] = useState(ShippingInfo.address)
    const [City,setCity] = useState(ShippingInfo.City)
    const [state,setstate] = useState(ShippingInfo.state)
    const [country,setcountry] = useState(ShippingInfo.country)
    const [Phone,setPhone] = useState(ShippingInfo.Phone)
    const [pincode,setpincode] = useState(ShippingInfo.pincode)


    const ShippingSubmit=(e)=>{
     
        e.preventDefault();

        if(Phone.length!==10)
        {
            Alert.error("Phone number Should be 10 Digit number")
            return;
        }

        dispatch(SaveShippingInfo({Address,City,state,country,Phone,pincode}));
         
        Navigate("/order/confirm")

    }

  return (
    <>

    <CheckOutStep activestep={0}/>

    <div className='ShippingContainer'>
        <div className='ShippingBox'>
            <h2 className='ShippingHeading'>Shipping Details</h2>

            <form className='ShippingForm' onSubmit={ShippingSubmit}>

                <div>
                    <HomeIcon/>
                    <input
                    type="text"
                    placeholder='Address'
                    required
                    value={Address}
                    onChange={(e)=>setAddress(e.target.value)}/>
                </div>

                <div>
                    <PhoneIcon/>
                    <input
                    type="number"
                    placeholder='Phone Number'
                    required
                    value={Phone}
                    onChange={(e)=>setPhone(e.target.value)}/>
                </div>

                <div>
                    <LocationCityIcon/>
                    <input
                    type="text"
                    placeholder='City'
                    required
                    value={City}
                    onChange={(e)=>setCity(e.target.value)}/>
                </div>

                <div>
                    <PinDropIcon/>
                    <input
                    type="number"
                    placeholder='PIN Code'
                    required
                    value={pincode}
                    onChange={(e)=>setpincode(e.target.value)}/>
                </div>

                <div>
                    <PublicIcon/>
                    <select
                    required
                    value={country}
                    onChange={(e)=>setcountry(e.target.value)}>

                        <option value="">Country</option>
                        {console.log(Country.getAllCountries())}
                        {
                        
                            //Country here is of country-state-city npm package
                            Country.getAllCountries().map((item)=>{
                               return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            })
                        }

                    </select>
                </div>


                {
                    country ? <>
                    <div>
                            <TransferWithInAStationIcon/>
                            <select
                            required
                            value={state}
                            onChange={(e)=>setstate(e.target.value)}>

                                <option value="" >State</option>

                                {
                                    //State here is package state


                                    State.getStatesOfCountry(country).map((itemstate)=>{
                                        return <option key={itemstate.isoCode} value={itemstate.isoCode}>{itemstate.name}</option>
                                    })
                                }

                            </select>
                        </div>
                        
                    </>:<></>
                        
                    
                }


                <input
                type="submit"
                value="CONTINUE"
                className='ShippingBtn'
                style={{cursor:`${state?"pointer":"not-allowed"}`,backgroundColor:`${state?"orangered":"rgba(255, 99, 71,0.7)"}` }}
                disabled={state?false:true}
                />

               

            </form>

        </div>

    </div>

    </>
  )
}

export default Shipping