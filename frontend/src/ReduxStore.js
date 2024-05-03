
//Initializing  REDUX STORE


import {createStore,combineReducers,applyMiddleware} from "redux";

import thunk from "redux-thunk"

import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailsReducer, productReducer ,New_Product_Reducer,DeleteProduct_Reducer,AddReview_Reducer,UpdateProduct_Reducer} from "./Redux_Reducers/ProductReducer";



import{userReducer,userUpdateProfile,forgetPasswordReducer,GetUserListReducer,DeleteUser_Reducer,User_DetailReducer} from "./Redux_Reducers/UserReducer"

import {CartReducer} from "./Redux_Reducers/CartReducer"


import { AllOrdersReducer, MyOrdersReducer, NewOrderReducer } from "./Redux_Reducers/OrderReducer";

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    loginUser:userReducer,
    UpdateUser:userUpdateProfile,
    forgetPassword:forgetPasswordReducer,
    cart:CartReducer,
    newProduct:New_Product_Reducer,
    delproduct:DeleteProduct_Reducer,
    getUser:GetUserListReducer,
    delUser:DeleteUser_Reducer,
    newOrder:NewOrderReducer,
    myOrders:MyOrdersReducer,
    newReview:AddReview_Reducer,
    UpdateProduct:UpdateProduct_Reducer,
    allOrder:AllOrdersReducer,
    userDetail:User_DetailReducer,
    shippingInfoUpdateReducer:userUpdateProfile,
    


});

let initailState ={
    cart:{
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem('cartItems')) :[],
        ShippingInfo : localStorage.getItem("ShippingInfo") ? JSON.parse(localStorage.getItem('ShippingInfo')) :[],
    }
};

const middleware = [thunk]

const store = createStore(reducer,initailState,composeWithDevTools(applyMiddleware(...middleware)))


export default store;