import{CREATE_ORDER,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERROR,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,

    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET

} from "./../Redux_Constants/OrderConstant"


import axios from "axios"
import { AllOrdersReducer } from "../Redux_Reducers/OrderReducer"

export const CreateOrder=(order)=>async(dispatch,getState)=>{

    console.log("AAYA to hoon ")

    

    try{

        dispatch({
            type:CREATE_ORDER
        })

        console.log(".;l.;l")
          
        const data = await axios.post("/api/v1/order/new",order);

        console.log("%%%%%%%%%%%%%%%%%%%%%%%%")

        console.log("Order:",data);

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data,
        })
    }
    catch(error)
    {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        })
    }

}

export const ClearError=()=>async(dispatch)=>{

    dispatch({
        type:CLEAR_ERROR
    })
}



export const MyOrders=()=>async(dispatch,getState)=>{

    try{

        dispatch({type:MY_ORDER_REQUEST})
        
        console.log("Order aaya")
        const {data} = await axios.get("/api/v1/orders/Myorder");

        console.log("GetMyOrder:",data);

        dispatch({
            type:MY_ORDER_SUCCESS,
            payload:data.myorders,
        })
    }
    catch(error)
    {
        dispatch({
            type:MY_ORDER_FAIL,
            payload:error.response.data.message,
        })
    }

}




//Get All Order List --ADMIN

export const ALLOrders =()=> async(dispatch)=>{

    try{

        dispatch({type:ALL_ORDER_REQUEST})

        console.log("aaya for order list")

        const {data} = await axios.get('/api/v1/Admin_OrdersList')

        console.log("Orders Are as: ",data.ALLOrders)

        dispatch({
            type:ALL_ORDER_SUCCESS,
            payload:data.AllOrders
        })
    }
    catch(error)
    {
        dispatch({
            type:ALL_ORDER_FAIL,
            payload:error.response.data.message
        })
    }

}



