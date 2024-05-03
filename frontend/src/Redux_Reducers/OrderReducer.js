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

export const NewOrderReducer =(state={},action)=>{

    switch(action.type)
    {
        case CREATE_ORDER:
            return{
                ...state,
                loading:true,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading:false,
                order:action.payload
            }

        case CREATE_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            }
        default:
            return state
    }

}




export const MyOrdersReducer =(state={orders:[]},action)=>{

    switch(action.type)
    {
        case MY_ORDER_REQUEST:
            return{
                loading:true,
            }
        case MY_ORDER_SUCCESS:
            return {
                loading:false,
                orders:action.payload
            }

        case MY_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            }
        default:
            return state
    }

}




//Get All Order List  -- ADMIN

export const AllOrdersReducer =(state={orders:[]},action)=>{

    switch(action.type)
    {
        case ALL_ORDER_REQUEST:
            return{
                loading:true,
            }
        case ALL_ORDER_SUCCESS:
            return {
                loading:false,
                orders:action.payload
            }

        case ALL_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            }
        default:
            return state
    }

}




//UPdate Order Reducer


// export const UpdateOrdersReducer =(state={},action)=>{

//     switch(action.type)
//     {
//         case UPDATE_ORDER_REQUEST:
//             return{

//                 ...state,
//                 loading:true,
//             }
//         case UPDATE_ORDER_SUCCESS:
//             return {
//                 ...state,
//                 loading:false,
//                 isUpdated:action.payload
//             }

//         case UPDATE_ORDER_FAIL:
//             return {
//                 ...state,
//                 loading:false,
//                 error:action.payload
//             }
//         case UPDATE_ORDER_RESET:
//             return {
//                 ...state,
//                 isUpdated:false
//             }
//         case CLEAR_ERROR:
//             return {
//                 ...state,
//                 error:null,
//             }
//         default:
//             return state
//     }

// }


