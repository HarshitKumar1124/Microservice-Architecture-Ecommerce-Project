import React, { useEffect, useState } from 'react'
import "./Cart.css";
import CardItemTemplate from './CardItem.js'
import {AddItemInCard}  from '../../Redux_Actions/CartAction';

import { useSelector ,useDispatch} from 'react-redux';

import { useAlert } from 'react-alert';

import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import { Link, useNavigate } from 'react-router-dom';
import {Typography} from "@material-ui/core"

const CartList = () => {

    const Navigate = useNavigate()

    const dispatch = useDispatch();
    const alert = useAlert()

    const {cartItems} = useSelector((state)=>state.cart)

    // const [TotalCost,setTotalCost] = useState(0);

    console.log(cartItems)


    const IncreaseQuantity =(productId,quantity,stock)=>{

        console.log("Increaase")
        const newqty = quantity+1;
        if(stock<=quantity)
        {
            console.log("Not Increased")
            
            alert.error("No More Stock AvaiLable !");
            return;
        }


        console.log("new")
        dispatch(AddItemInCard(productId,newqty));

        

    }

  
     
    useEffect(() => {

        
     
    }, [cartItems])
    

    // const itemtemp = {
    //     name:"Product3",
    //     price:150,
    //     productid:'62a7e23f5375ea7f8f03de97',
    //     quantity:2,
    //     url:"../../IronMan.jpg",
    //     stock:10
    // }

    const checkOutHandler=()=>{
        Navigate("/login_signup?redirect=Shipping")
    }

  return (
    <>
    <div className='CardPage'>

        <div className='cartHeader'>

            <p>Product</p>
            <p>Quantity</p>
            <p>SubTotal</p>

        </div>

        {

            cartItems.length==0?<div className='NoProductMessage'>
            <RemoveShoppingCartIcon/>
            <Typography>No Product IN Your Cart</Typography>
            <Link tag="a" to="/products" >View Products</Link>

            </div>:<>

            {
                cartItems.map((CartElement)=> <>
                
               

               <div className='CartContainer' key={CartElement.productID}>
                <CardItemTemplate item={CartElement}/>
            
                <div className='CartInput'>
                    <button> - </button>
                    <input type="number" value={CartElement.quantity}/>
                    <button onClick={()=>IncreaseQuantity(CartElement.productID,CartElement.quantity,CartElement.stock)}> + </button>

                </div>

                <p className='SubTotal'>
                    {`( Rs:${CartElement.price} x Quantity: ${CartElement.quantity} )`}<br/><b>{`Rs ${CartElement.price * CartElement.quantity} `}</b>
                </p>

                </div>

                </>)
            }

            </>
                                       
               

        }

        <div className='GrossTotal'>

            <div></div>
            <div className='CartGrossProfitBox'>

                <p>Gross Profit</p>
                <p>{`${cartItems.reduce((Total,num)=> Total + num.quantity*num.price,0)}`}</p>

            </div>
            <div></div>
            <button onClick={checkOutHandler}>CheckOut</button>

        </div>



    </div>
    </>
  )
}

export default CartList