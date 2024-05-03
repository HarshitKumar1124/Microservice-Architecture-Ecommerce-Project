import {ADD_TO_CART,REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from "../Redux_Constants/CartConstant"

export const CartReducer =(state={cartItems:[],ShippingInfo:{}},action)=>{

    switch(action.type)
    {
        case ADD_TO_CART:
            console.log("HII REDUCER")
            const item_to_add = action.payload;

     
            console.log(item_to_add)
            const isItemExist = state.cartItems.filter((element)=> element.productID== item_to_add.productID)
                      
            console.log(state)
            console.log("jooo",isItemExist.length)
            
            if(isItemExist.length)
            {
                return {
                    ...state,
                    cartItems:state.cartItems.map((i)=>i.productID===isItemExist.productID ? item_to_add:i)
                }
            }
            else
            {
                return {
                    ...state,
                    cartItems:[...state.cartItems,item_to_add]
                }
            }
    
    
        case REMOVE_CART_ITEM:

            console.log("remove reducer")
            return {
                ...state,
                cartItems:state.cartItems.filter(items=> items.productID!==action.payload),
            }

        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                ShippingInfo:action.payload
            }


        default:
            return {
                ...state
            }
    
    
    }
}