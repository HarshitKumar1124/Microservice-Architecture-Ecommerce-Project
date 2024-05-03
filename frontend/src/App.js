import Header from "./components/Header/Header.js";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Webfont from "webfontloader";
import Footer from "./components/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Contact from "./components/Contact/Contact.js";
import About from "./components/About/About.js";
import Loader from "./components/Loader/Loader.js";
import AllProducts from "./components/Product/AllProducts.js";

import Search from "./components/Product/Search.js"

import LogInSignUp from "./components/User/LogInSignUp.js"

import Reduxstore from './ReduxStore'
import { LoadUser } from "./Redux_Actions/UserAction.js";


import UserOptions from './components/Header/Login_Users_option_Header.js'


import {useSelector} from 'react-redux';

import Profile from "./components/Profile/Profile.js"


//using Protected route in order to make sure page will load if an only if User is logged in., even u refresh the page
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js"

import UserUpdate from  "./components/UserUpdate/UserUpdate.js"
import UserPasswordUpdate from "./components/UserUpdate/UserPasswordUpdate.js";
import ForgetPassword from  "./components/UserUpdate/ForgetPassword.js"
import Forget_Reset_Password from  "./components/UserUpdate/Forget_Reset_Password.js"




import Orders from "./components/Order/Orders.js"
import Dashboard from "./components/Admin_DashBoard/Dashboard.js";

import Add_Product from "./components/Add_ProductPage/Add_ProductPage.js"

import Admin_ProductList from "./components/Admin_DashBoard/Admin_ProductList.js"

import Admin_OrderList from "./components/Admin_DashBoard/Admin_OrderList.js"

import Admin_UserList from "./components/Admin_DashBoard/Admin_UserList.js"

import Cart from "./components/Cart/CartList.js"

import Shipping from "./components/Shipping&Payment/Shipping.js"

import ConfirmOrder from "./components/Shipping&Payment/ConfirmOrder.js"

import Payment from "./components/Shipping&Payment/Payment.js"
import axios from "axios";



//Payment Route must be enclosed within this element
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from "@stripe/stripe-js" 


import OrderSuccess from "./components/ErrorAndSuccessPage/OrderSuccess.js";


import UpdateProduct from "./components/Product/UpdateProduct"

import UserInfo_AdminView from "./components/Admin_DashBoard/Admin_AllUserInfo.js"

import UpdateShippingInfo from "./components/UserUpdate/UpdateShippingInfo.js"




function App() {

  
  const {loading,isAuthenticated,user} = useSelector(state=>state.loginUser)

  let stripePromise;
  
  async function getStripeAPIKey(){
    alert("jii")
    console.log("AAAAAAAAAAAAAAAAAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIIIIIIIIIIII")

    // const {data} = await axios.get('/api/v1/stripeAPIkey')
    // setStripeAPIKey(data.stripeAPIkey)
    // console.log("AAAAAAAAAAAAAAAAAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPIIIIIIIIIIIIIIIIIIIIIIIIIIII",data.stripeAPIkey,StripeAPIKey)


   stripePromise = loadStripe("pk_test_51LqbsDSEXYJYfw16PPnMORYOPWJakqmNjH2k0ihYZ7cGOsSAB62VxMnrF6ZTvSjiMuPaUkU2FO2FtQqn1Utx4OXi00WHQjlNz2")
  }
  
  
  useEffect(() => {
    Webfont.load({
      google: {
        families: [
          "Quantico",
          "Yellowtail",
          "Roboto",
          "Droid Sans",
          "Chilanka",
          "Changa"
        ],
      },
    });

    Reduxstore.dispatch(LoadUser())

    //payment purpose
    //  getStripeAPIKey();
    
  }, []);


  

  return (
    <Router>
      
      <Header />
       {loading?<Loader/>:(isAuthenticated && <UserOptions user={user}/>) }
      
      {/* //Switch is replaced By Routes from React-router-dom --v6 */}
      <Routes>                                                        
        <Route exact path="/" element={<Home/>} />
         {/* <Route exact path="/loader" element={<Loader />} /> */}
        <Route exact path="/products" element={<AllProducts/>} />
        <Route exact path="/products/:id" element={<ProductDetails/>} />
        <Route exact path="/contact"  element={<Contact/>} />
        <Route exact path="/about"  element={<About/>} />


        <Route exact path="/products/new" element={<Add_Product/>}/>

        <Route  exact path="/search" element={<Search/>}/>
        <Route   path="/product/:keyword" element={<AllProducts/>} />


        <Route exact path="/login_signup" element={<LogInSignUp/>}/>
        
        {/* //Unable to understand Protected Route */}
        <Route exact path="/MyProfile" element={<Profile user={user}/>} />
      
        {/* <Route exact path="/MyProfile/update" element={<UserUpdate/>} /> */}




        {/* <Route exact path="/password/update" element={<UserPasswordUpdate/>}/> */}

        {/* <Route exact path="/password/forget" element={<ForgetPassword/>}/> */}

        {/* <Route exact path="/password/reset/:token" element={<Forget_Reset_Password/>}/> */}

        {/* <Route exact path="/orders" element={<Orders/>} /> */}

        <Route exact path="/dash_board" element={<Dashboard/>} />

        {/* <Route exact path="/admin_view/products" element={<Admin_ProductList/>} /> */}

        {/* <Route exact path="/admin_view/orders" element={<Admin_OrderList/>} /> */}

        {/* <Route exact path="/admin_view/users" element={<Admin_UserList/>} /> */}

        {/* <Route exact path="/cart" element={<Cart/>} /> */}



        <Route exact path="/login_signup/Shipping" element={<Shipping/>} />




        {/* <Route exact path="/order/confirm" element={<ConfirmOrder/>} />

        <Route exact path="/process/payment" element={<Payment/>} /> */}

        
          {/* <Route exact path="/process/payment" element={<Payment/>} /> */}

          {/* <Route exact path="/success" element={<OrderSuccess/>} />


          <Route exact path="/products_Update/:id" element={<UpdateProduct/>}  />

          <Route exact path="/admin/orders" element={<Admin_OrderList/>} />

          <Route exact path="/Admin_view/UserInfo/:id" element={<UserInfo_AdminView/>}/>

          <Route exact path="/MyProfile/update/ShippingInfo" element={<UpdateShippingInfo/>} /> 
         */}

      </Routes>

      <Footer /> 
    </Router>
  );
}

export default App;



// 11.52min

//payment thing Completed


// ..Creating Order List of User


//order wala create wala apis kaam nahi kar raha


