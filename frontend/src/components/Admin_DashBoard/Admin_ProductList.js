import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useAlert } from 'react-alert'
import MetaData from '../Layout/MetaData'
import { ClearError,GetAdminProductList,DeleteProduct } from '../../Redux_Actions/ProductAction'
import DisplayList from "./DisplayList.js"


const Admin_ProductList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const {loading,error,product} = useSelector((state)=>state.products);

    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(ClearError());

        }

        dispatch(GetAdminProductList());


    },[dispatch,error,alert])


  return (
    <>
    <MetaData title="Admin | StockList"/>
    {
        loading?<h1>Loading</h1>:<>
        {
            product ?<DisplayList ToDisplay={product} item="Product"/>:<h1>No Products Yet</h1>
        }
        </>
    }

    </>
  )
}

export default Admin_ProductList