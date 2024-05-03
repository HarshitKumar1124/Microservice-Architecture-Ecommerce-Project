import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useAlert } from 'react-alert'
import MetaData from '../Layout/MetaData'

import DisplayListOrder from "./DisplayListOrder.js"
import { ALLOrders,ClearError } from '../../Redux_Actions/OrderAction'


const Admin_OrderList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const {loading,error,orders} = useSelector((state)=>state.allOrder);

    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(ClearError());

        }

        dispatch(ALLOrders());


    },[dispatch,error,alert])


  return (
    <>
    <MetaData title="Admin | All OrderList"/>
    {
        loading?<h1>Loading</h1>:<>
        {
            orders ?<DisplayListOrder ToDisplay={orders} item="Orders"/>:<h1>No Orders Yet</h1>
        }
        </>
    }

    </>
  )
}

export default Admin_OrderList