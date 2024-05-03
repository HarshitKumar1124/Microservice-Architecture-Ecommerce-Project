import React from 'react'
import { Link } from 'react-router-dom'
import "./CardItem.css"
import Logo from "../../IronMan.jpg"
import { RemoveItemFromCart } from '../../Redux_Actions/CartAction'
import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'


const CardItem = ({item}) => {

  const alert = useAlert();

  const dispatch = useDispatch();

  const DeleteCartItem=(productid)=>{

    dispatch(RemoveItemFromCart(productid));
    alert.success(`${productid} Item Removed`);

  }
  return (
    <>
    <div className='CardItemCard'>

        <img src={item.url} alt={item.url}/>
       <div style={{border:"2px solid green"}}>
       
        <Link to="https://www.google.com" tag="a">{item.name}</Link>
        <span>{`Price: ${item.price}`}</span>
        <p onClick={()=>DeleteCartItem(item.productID)}>Remove</p>
    

       </div>

    </div>
    </>
  )
}

export default CardItem