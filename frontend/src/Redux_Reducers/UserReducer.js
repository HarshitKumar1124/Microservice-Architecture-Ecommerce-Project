// import { UserLOGIN_Request,UserLOGIN_fail,UserLOGIN_success, Clear_errors } from "../Redux_Constants/UserConstants";

import {  UPDATE_PROFILE_Request, UPDATE_PROFILE_Reset, UPDATE_PROFILE_success, UPDATE_PROFILE_fail,LOGOUT_fail,LOGOUT_success, LoadUser_Request,LoadUser_fail,LoadUser_success,UserLOGIN_Request,UserLOGIN_fail,UserLOGIN_success, Clear_errors ,UserREGISTER_Request,UserREGISTER_fail,UserREGISTER_success} from "../Redux_Constants/UserConstants";


import {UPDATE_Password_Request,
    UPDATE_Password_success,
    UPDATE_Password_fail,
    UPDATE_Password_Reset,
    FORGET_Password_Request,
    FORGET_Password_success,
    FORGET_Password_fail,
    RESET_Password_Request,
    RESET_Password_success,
    RESET_Password_fail,
    Get_User_Request,
    Get_User_fail,
    Get_User_success,
    Get_User_Reset,
    Delete_User_Request,
    Delete_User_success,
    Delete_User_fail,
    Delete_User_Reset,



    UPDATE_ShippingInfo_Request,
    UPDATE_ShippingInfo_success,
    UPDATE_ShippingInfo_fail,
    UPDATE_ShippingInfo_Reset,


    Get_Specific_User_Detail_REQUEST,
    Get_Specific_User_Detail_SUCCESS,
    Get_Specific_User_Detail_FAIL} from "../Redux_Constants/UserConstants";



export const userReducer = (state={Users:{}},action)=>{

    switch(action.type)
    {
        case UserLOGIN_Request:
        case UserREGISTER_Request:
        case LoadUser_Request:
            return{
                loading:true,
                isAuthenticated:false

            };
        case LOGOUT_success:
            return{
                loading:false,
                isAuthenticated:false,
                user:null
            }
        case UserLOGIN_success:
        case UserREGISTER_success:   
        case LoadUser_success: 
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload

            };
        case LOGOUT_fail:
            return{
                ...state,
                error:action.payload
            }
        case UserLOGIN_fail:
        case UserREGISTER_fail:    
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload

            };
        case LoadUser_fail:
            return {
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload

            }
        case Clear_errors:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}


//Update Profile Reducer
export const userUpdateProfile = (state={},action)=>{

    switch(action.type)
    {
        case UPDATE_PROFILE_Request:
        case UPDATE_Password_Request:
        case UPDATE_ShippingInfo_Request:
            return{
                
                ...state,
                loading:true,
                

            };
        case UPDATE_PROFILE_success: 
        case UPDATE_Password_success:
        case UPDATE_ShippingInfo_success:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            };
        case UPDATE_PROFILE_fail:
        case UPDATE_Password_fail:
        case UPDATE_ShippingInfo_fail:
            return{
                ...state,
                loading:false,
                error:action.payload

            };
        case UPDATE_PROFILE_Reset:
        case UPDATE_Password_Reset:
        case UPDATE_ShippingInfo_Reset:
            return {
                ...state,
                isUpdated:false

            }
        case Clear_errors:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}



//Forget Password Reducer
export const forgetPasswordReducer = (state={},action)=>{

    switch(action.type)
    {
        case FORGET_Password_Request:
        case  RESET_Password_Request:
            return{
                
                ...state,
                loading:true,
                error:null

            };
      
        case FORGET_Password_success:
            return{
                ...state,
                loading:false,
                message:action.payload
            };
        case RESET_Password_success:
            return{
                ...state,
                loading:false,
                success:action.payload
            };
        
        
     
        case FORGET_Password_fail:
        case RESET_Password_fail:
            return{
                ...state,
                loading:false,
                error:action.payload

            };
        case Clear_errors:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}


//Get UserList Reducer
export const GetUserListReducer = (state={Users:[]},action)=>{

    switch(action.type)
    {
        case Get_User_Request:
            return{

                loading:true,
                Users:[{}],
                

            };
    
        case Get_User_fail:
            return{
                loading:false,
                error:action.payload

            };
             case Get_User_success:
            return{
                loading:false,
                allUser:action.payload
            } 
        case Clear_errors:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}


//Delete User Reducer
export const DeleteUser_Reducer=(state={},action)=>{

    switch(action.type)
    {
        case Delete_User_Request:
            return {
                ...state,
                loading:true,
            };
        case Delete_User_success:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload
               
            };
        case Delete_User_fail:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
            case Delete_User_Reset:
                return{
                    ...state,
                    isDeleted:false
                };
        case Clear_errors:
            return{
                ...state,
                error:null,
            };
        default:
            return state;

    }


}


//For fetching specific user informations
export const User_DetailReducer=(state={USerInfo:{}},action)=>{

    
    switch (action.type) {
        case  Get_Specific_User_Detail_REQUEST:
            
            return{
                loading:true,
                ...state,
            }

        case  Get_Specific_User_Detail_FAIL:
        
            return{
                loading:false,
                error:action.payload
            }
        case  Get_Specific_User_Detail_SUCCESS:
        
            return{
                loading:false,
                userDetail:action.payload
                
            } 
        case Clear_errors:
    
                return{
                ...state,
                error:null
            }        
    
        default:
            return state;
    }

}