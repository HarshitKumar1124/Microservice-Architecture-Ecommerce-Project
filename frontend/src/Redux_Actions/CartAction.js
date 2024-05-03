import {ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from "../Redux_Constants/CartConstant"
import React from 'react'
import axios from "axios"

export const AddItemInCard = (id,quantity,user)=> async (dispatch,getState) =>{

    console.log("AADDD ITEMS AA GAYA")

   const {data} = await axios.get(`/api/v1/products/${id}`)
   

   console.log("ADD TO CART ",data)

   console.log("GETSTATE : ",getState().cart);



    const OBJ_DATA={
        productID:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.productImage[0].image_url,
        stock:data.product.stock,
        quantity
    }

    const CartDetails = {
        productID:data.product._id,
        userCreated_ID:user._id,
        productName:data.product.name,
        productPrice:data.product.price,
        productImage:{
            image_url:data.product.productImage[0].image_url,
        },
        productCartQuantity:quantity,
    }


    console.log(CartDetails)

  

   dispatch({
    type:ADD_TO_CART,
    payload:OBJ_DATA,
   })

   console.log("NUM")



   
    // { if(getState().cart.cardItems)
    //     window.localStorage.setItem('cartItems',JSON.stringify(getState().cart.cardItems))
    // }


    const DATA = await axios.post('api/v1/AddCartItem',CartDetails)

    console.log(DATA)


} 

export const RemoveItemFromCart =(productID)=>async(dispatch)=>{

    console.log("Deleting from Cart ",productID);

    dispatch({
        type:REMOVE_CART_ITEM,
        payload:productID,
    })

}



export const SaveShippingInfo=(data)=>async(dispatch)=>{

    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data
    })

    // window.localStorage.setItem('shippingInfo',JSON.stringify(data))
}