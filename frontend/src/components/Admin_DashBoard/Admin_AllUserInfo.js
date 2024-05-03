import {  Button, Typography } from "@material-ui/core";
import {Link} from "react-router-dom"
import React,{useEffect} from "react";
import "./Admin_AllUserInfo.css"

import DP from "../../Product Images/Lykan-Hypersport-Front.png"

import HomeIcon from '@material-ui/icons/Home';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PlaceIcon from '@material-ui/icons/Place';
import CallIcon from '@material-ui/icons/Call';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {UserDetailFetcher} from '../../Redux_Actions/UserAction'





const Admin_AllUserInfo = () => {

  const fetchparams = useParams();
  const dispatch = useDispatch();
  const Alert = useAlert();

  const {loading,error,userDetail} = useSelector(state=>state.userDetail)

  console.log(loading,error,userDetail);

  useEffect(() => {

    dispatch(UserDetailFetcher(fetchparams.id))
    
  }, [])
  

  return (
    <>
      <div className="Container">
        <div className="HeadingBar">
        </div>
        
        <Typography>User Information</Typography>

        <div className="DisplayArea">
          <div>
            <div className="LeftSide">
                <Typography>Profile Image</Typography>
                <img src={DP} title="" alt=""/>
                <Typography>User Name</Typography>
            </div>

            <div className="RightSide">
            <Typography>Personal</Typography>
            <div className="Biodata">

            <div className="InputCell">
                    <p>USER ID</p>
                    {userDetail ? <h3>{userDetail._id}</h3> :  <h3>Server Issue</h3> }
                    

                </div>

                <div className="InputCell">
                    <p>Name</p>
                    {userDetail ? <h3>{userDetail.name}</h3> :<h3>Server Issue</h3> }

                </div>

               
                <div className="InputCell">
                    <p>Email Address</p>
                  {userDetail ?<h3>{userDetail.email}</h3> : <h3>Server Issue</h3> }

                </div>

                <div className="InputCell">
                    <p>Contact No: - </p>
                    {userDetail ? <h3>{userDetail.shippingInfo.Contact==0 ? "N/A" :userDetail.shippingInfo.Contact }</h3> :<h3>Server Issue</h3>}

                </div>

                

            </div>

            </div>
          </div>

          <div>
            <div className="AddressInformation">
                <Typography>Shipping AddressInformation</Typography>
                <div className="AddressDisplay">
                <div className="AddressDisplayCell">
                    <HomeIcon/>
                    <div>
                    <p>Home Address</p>
                    {userDetail ? <h3>{userDetail.shippingInfo.Locality=="" ? "N/A" : userDetail.shippingInfo.Locality}</h3> :  <h3>Server Issue</h3> }
                    </div>

                </div>

                <div className="AddressDisplayCell">
                    <LocationCityIcon/>
                    <div>
                    <p>City Name</p>
                    {userDetail ? <h3>{userDetail.shippingInfo.City=="" ? "N/A" :userDetail.shippingInfo.City }</h3> :<h3>Server Issue</h3>}
                    </div>

                </div>

                <div className="AddressDisplayCell">
                    <PlaceIcon/>
                    <div>
                    <p>StateName</p>
                    {userDetail ? <h3>{userDetail.shippingInfo.State=="" ? "N/A" :userDetail.shippingInfo.State }</h3> :<h3>Server Issue</h3>}
                    </div>

                </div>

                <div className="AddressDisplayCell">
                    <CallIcon/>
                    <div>
                    <p>Contact</p>
                    {userDetail ? <h3>{userDetail.shippingInfo.Contact==0 ? "N/A" :userDetail.shippingInfo.Contact }</h3> :<h3>Server Issue</h3>}
                    </div>

                </div>

                <div className="AddressDisplayCell SocialMediaLink">
                    <LinkedInIcon/>
                    <div>
                    <p>LinkedIN</p>
                    <Link to={userDetail ?(userDetail.socialHandles.LinkedIN=="" ? "" :userDetail.socialHandles.LinkedIN ):""} tag='a' title="Visit LinkedIN Profile">{userDetail ? <h3>{userDetail.socialHandles.LinkedIN=="" ? "N/A" :userDetail.socialHandles.LinkedIN }</h3> :<h3>Server Issue</h3>}</Link>
                    </div>

                </div>

                <div className="AddressDisplayCell SocialMediaLink">
                    <GitHubIcon/>
                    <div>
                    <p>GitHub</p>
                    <Link to={userDetail ?(userDetail.socialHandles.GitHub=="" ? "" :userDetail.socialHandles.GitHub ):""} tag='a' title="Visit LinkedIN Profile">{userDetail ? <h3>{userDetail.socialHandles.GitHub=="" ? "N/A" :userDetail.socialHandles.GitHub }</h3> :<h3>Server Issue</h3>}</Link>
                    </div>

                </div>

                

            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_AllUserInfo;
