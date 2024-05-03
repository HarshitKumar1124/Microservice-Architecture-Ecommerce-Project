import React, { Fragment, useState } from 'react'
import "./Header.css"

import {SpeedDial,SpeedDialAction} from '@material-ui/lab'


import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { useNavigate } from 'react-router';

import { useAlert } from 'react-alert';

import { useDispatch, useSelector } from 'react-redux';

import {userLogOut} from "../../Redux_Actions/UserAction"

import Backdrop from '@material-ui/core/Backdrop';


const Login_Users_option_Header = ({user}) => {
const {cartItems} = useSelector((state)=>state.cart)
  
  const [Open,setOpen] = useState(false)

  const Navigate=useNavigate();

  const alert = useAlert();

  const dispatch=useDispatch();



  const Orders=()=>{

    Navigate("/orders")

  }

  const Profile=()=>{

    Navigate("/MyProfile")
  }


  const logOut=()=>{

    dispatch(userLogOut())
    Navigate("/")
    alert.show('LogOut SuccessFully !')
    
  
  }


  const DashBoard=()=>{

    Navigate("/dash_board")
  }

  const Cart=()=>{

    Navigate("/cart")
  }







  let actions =[
    {icon: <ListAltIcon/> ,name:"Orders",func:Orders},
    {icon: <PersonIcon/> ,name:"Profile",func:Profile},
    {icon: <ShoppingCartIcon/>,name:`Cart(${cartItems.length})`,func:Cart},
    {icon: <ExitToAppIcon/> ,name:"logOut",func:logOut}
  ]

  if(user.userType ==='admin')
  {
    //Unshift adds the element at beginning of an array
    actions.unshift({icon: <DashboardIcon/> ,name:"DashBoard",func:DashBoard})
  }


  
  return (
    <Fragment>
      <Backdrop open={Open} style={{zIndex:10}}/>
     
      <SpeedDial 
      ariaLabel='SpeedDial tooltip example'
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      open={Open}
      style={{position:"fixed",right:30,bottom:20,zIndex:11}}
      icon={<AccountBoxIcon/>}
      // user.profilePic.image_url!=="imageURL"?<img src={user.profilePic.image_url} alt={`${user.name} Profile Icon`} className="SpeedDialIcon" title={`${user.name} Profile Icon`} />
      >
        {actions.map((action) => (
        <SpeedDialAction
      key={action.name}
      icon={action.icon}
      tooltipTitle={action.name}
      onClick={action.func}
      />
  ))}
      </SpeedDial>
        
    </Fragment>
  )
}

export default Login_Users_option_Header