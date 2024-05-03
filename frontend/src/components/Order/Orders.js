import React,{useEffect} from 'react'
import "./Orders.css"
import { DataGrid } from '@material-ui/data-grid'
import { Link, useNavigate } from 'react-router-dom';
import {Typography} from "@material-ui/core"

import { useSelector ,useDispatch} from 'react-redux';

import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';
import LaunchIcon from '@material-ui/icons/Launch'
import { ClearError } from '../../Redux_Actions/OrderAction';
import { MyOrders } from '../../Redux_Actions/OrderAction';

const Orders = () => {

  const Alert  = useAlert();

  const Navigate = useNavigate();
  
  const dispatch = useDispatch();


  const {error,loading,user,isAuthenticated} =useSelector(state=>state.loginUser)

  console.log(user)

  const {loading:OrderLoading,orders} = useSelector(state=>state.myOrders)

  console.log("Order",orders)

  const columns=[
    {
      field: "id",
      headerName: "Order ID",
      
      flex: .5,
    },
    {
      field: "productID",
      headerName: "Product ID",
      
      flex: .5,
    },
    {
      field: "ItemQuantity",
      headerName: "Item Quantity",
      type:"number",
      flex: .5,
    },
    {
      field: "Amount",
      headerName: "Amount",
      type:"number",
      flex: .5,
    },
    {
      field: "Status",
      headerName: "Delivery Status",
      type:"text",
      flex: .5,
    },
  
   
    {
      field:"Actions",
      flex:0.5,
      headerName:"Actions",
      type:"number",
      sortable:false,
      renderCell:(params)=>{
        return (
          <Link to={`/order/${params.getValue(params.id,'id')}`}>
            <LaunchIcon/>
          </Link>
        )
      }
    }
  ]
  const rows=[]


 if(orders)
 {
   orders.forEach((Element)=>{

    

    if(Element.OrderItem)
    {
      const DeliverStatus = Element.OrderStatus;
      Element.OrderItem.forEach((item) => {

        console.log(item)
        rows.push({ 
          
          id:item._id,
          ItemQuantity:item.quantity,
          Amount:item.price,
          productID:item.product,
          Status:DeliverStatus
          
        
        });
      });
    }

   })
 }

  useEffect(() => {
  if(error)
  {
    Alert.error(error)
    dispatch(ClearError)
  }

  dispatch(MyOrders())

  // Alert,error,dispatch
  }, [])
  




  return (
    <>
    {false?<Loader/>:(
      <div className='myOrderPage'>


        <Typography>{user.name} 's Order List</Typography>
        
        <DataGrid rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className='myOrderTable'
        autoHeight
        />


      </div>
    )}
 s
    </>
  )
}

export default Orders