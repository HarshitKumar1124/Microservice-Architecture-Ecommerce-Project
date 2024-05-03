import React, { useState,useEffect } from 'react'
import "../Shipping&Payment/Shipping.css"
import {Country,State} from "country-state-city"
import PinDropIcon from "@material-ui/icons/PinDrop"
import LocationCityIcon from "@material-ui/icons/LocationCity"
import PhoneIcon from "@material-ui/icons/Phone"
import HomeIcon from "@material-ui/icons/Home"
import PublicIcon from "@material-ui/icons/Public"
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import TransferWithInAStationIcon from "@material-ui/icons/TransferWithinAStation"

import { useNavigate } from 'react-router'

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import {UpdateShippingInfo} from "../../Redux_Actions/UserAction"
import {UPDATE_ShippingInfo_Reset} from "../../Redux_Constants/UserConstants"

import {LoadUser,ClearError} from '../../Redux_Actions/UserAction'

import { useParams } from 'react-router'



const Shipping = () => {

    const dispatch=useDispatch();
    const Alert = useAlert();
    const Navigate = useNavigate();
    const fetchparams = useParams();

    


    const {loading,error,isUpdated} = useSelector(state=>state.shippingInfoUpdateReducer)

    

const {error:LoadUserError,loading:LoadUserLogin,user,isAuthenticated} =useSelector(state=>state.loginUser)
console.log(LoadUserError,LoadUserLogin,isAuthenticated,user)
    

    console.log(loading,error,isUpdated)

    const [Locality,setLocality] = useState(
      user ? user.shippingInfo.Locality:""
    )
    const [Contact,setContact] = useState(
      user?user.shippingInfo.Contact:""
    )
    const [City,setCity] = useState(
      user?user.shippingInfo.City:""
    )
    const [Pincode,setPincode] = useState(
      user?user.shippingInfo.Pincode:""
    )
    const [country,setcountry] = useState(
      user?user.shippingInfo.CountryName:""
    )
    const [state,setstate] = useState(
      user?user.shippingInfo.State:""
    )
    const [GitHub,setGitHub] = useState(
      user?user.socialHandles.GitHub:""
    )
    const [LinkedIN,setLinkedIN] = useState(
      user?user.socialHandles.LinkedIN:""
    )

    const UpdateAddress=(e)=>{
     
        e.preventDefault();

       

        if(Contact.length!==10)
        {
            Alert.error("Phone number Should be 10 Digit number")
            return;
        }


        dispatch(UpdateShippingInfo({
          shippingInfo:{
            Locality,
            Contact,
            City,
            Pincode,
            CountryName:country,
            State:state,
          },
          socialHandles:{
            GitHub,
            LinkedIN
          }
      }))




    }

    useEffect(() => {

      dispatch(LoadUser());
     
      if(isUpdated)
      {
        Alert.success("Address Updated !")
        dispatch({type:UPDATE_ShippingInfo_Reset})
        Navigate("/")
      }

      if(error)
      {
        Alert.error(error);
        dispatch(ClearError());
      }

    }, [dispatch,isUpdated,error])
    

  return (
    <>
    <div className='ShippingContainer'>
        <div className='ShippingBox'>
            <h2 className='ShippingHeading'>Update Shipping Details</h2>

            <form className='ShippingForm' onSubmit={UpdateAddress}>

                <div>
                    <HomeIcon/>
                    <input
                    type="text"
                    placeholder='Locality'
                    required
                    value={Locality}
                    onChange={(e)=>setLocality(e.target.value)}
                     />
                </div>

                <div>
                    <PhoneIcon/>
                    <input
                    type="number"
                    placeholder='Phone Number'
                    required
                     value={Contact}
                     onChange={(e)=>setContact(e.target.value)}
                   />
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


                <div>
                    <LocationCityIcon/>
                    <input
                    type="text"
                    placeholder='City'
                    required
                    value={City}
                    onChange={(e)=>setCity(e.target.value)}
                    />
                </div>

                <div>
                    <PinDropIcon/>
                    <input
                    type="number"
                    placeholder='PIN Code'
                    required
                    value={Pincode}
                    onChange={(e)=>setPincode(e.target.value)}
                    />
                </div>

                <div>
                    <GitHubIcon/>
                    <input
                    type="text"
                    placeholder='GitHub'
                    required
                    value={GitHub}
                    onChange={(e)=>setGitHub(e.target.value)}
                     />
                </div>

                <div>
                    <LinkedInIcon/>
                    <input
                    type="text"
                    placeholder='LinkedIn'
                    required
                    value={LinkedIN}
                    onChange={(e)=>setLinkedIN(e.target.value)}
                     />
                </div>

                
                <input
                type="submit"
                value="UPDATE"
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