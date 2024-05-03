import axios from 'axios'

import { UPDATE_PROFILE_Request,
    UPDATE_PROFILE_success,
    UPDATE_PROFILE_fail,
    UPDATE_PROFILE_Reset,

    UPDATE_ShippingInfo_Request,
    UPDATE_ShippingInfo_success,
    UPDATE_ShippingInfo_fail,
    UPDATE_ShippingInfo_Reset,


    LOGOUT_success,UserLOGIN_Request,UserLOGIN_fail,UserLOGIN_success,LoadUser_Request,LoadUser_fail,LoadUser_success, Clear_errors ,UserREGISTER_Request,UserREGISTER_fail,UserREGISTER_success, LOGOUT_fail} from "../Redux_Constants/UserConstants";

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


    Get_Specific_User_Detail_REQUEST,
    Get_Specific_User_Detail_SUCCESS,
    Get_Specific_User_Detail_FAIL} from "../Redux_Constants/UserConstants"



//LOGIN Action
export const userLogin = (email,password)=>async(dispatch)=>{

    try{
        dispatch({type: UserLOGIN_Request});
        console.log("userlogin post")

    

         
        const {data} =await axios.post(`/api/v1/login_user`,{email,password});
       
        dispatch({
            type:UserLOGIN_success,
            payload:data.user
        })

    }
    catch(error)
    {
        dispatch({type:UserLOGIN_fail,payload:error.response.data.message})
    }

}


//SignUp Action
export const userRegister = (UserData)=>async(dispatch)=>{

    try{
        dispatch({type: UserREGISTER_Request});
        console.log("userREGISTER post")
  
        const {data} =await axios.post(`/api/v1/register_user`,UserData);
       
        dispatch({
            type:UserREGISTER_success,
            payload:data.user
        })

    }
    catch(error)
    {
        dispatch({type:UserREGISTER_fail,payload:error.response.data.message})
    }

}




//Load User Action - this is meant to load the page directly to account page if a person is logged in.... rather them giving them login/signup option on that page
export const LoadUser = ()=>async(dispatch)=>{

    try{
        dispatch({type: LoadUser_Request});
        console.log("LoadUser post")

    

         
        const {data} =await axios.get(`/api/v1/MyProfile`);
       
        dispatch({
            type:LoadUser_success,
            payload:data.user
        })

    }
    catch(error)
    {
        dispatch({type:LoadUser_fail,payload:error.response.data.message})
    }

}


export const userLogOut =()=>async (dispatch)=>{

    console.log("Logout here")

    try{

    
    await axios.get(`/api/v1/logout_user`);
    
    dispatch({
        type:LOGOUT_success
    })

    }
    catch(error)
    {
        dispatch({type:LOGOUT_fail,payload:error.response.data.message})
    }
}



//Update Profile Action

export const userUpdate = (UserNEWData)=>async(dispatch)=>{

    try{
        dispatch({type: UPDATE_PROFILE_Request});
        console.log("UPDATE_PROFILE post")
  
        const {data} =await axios.put(`/api/v1/MyProfile/update`,UserNEWData);
        console.log('Updated',data)
       
        dispatch({
            type:UPDATE_PROFILE_success,
            payload:true
        })

    }
    catch(error)
    {
        dispatch({type:UPDATE_PROFILE_fail,payload:error.response.data.message})
    }

}


//Update Shipping Info of User --LoggedIN
export const UpdateShippingInfo = (UserShippingInfo)=>async(dispatch)=>{

    try{
        dispatch({type: UPDATE_ShippingInfo_Request});
        console.log("UPDATE_ShippingInfo post")
  
        const {data} =await axios.put(`/api/v1/MyProfile/update/ShippingInfo`,UserShippingInfo);
        console.log('Updated',data)
       
        dispatch({
            type:UPDATE_ShippingInfo_success,
            payload:true
        })

    }
    catch(error)
    {
        dispatch({type:UPDATE_ShippingInfo_fail,payload:error.response.data.message})
    }

}



//Update Password Action

export const userPasswordUpdate = (NEWPasswordData)=>async(dispatch)=>{

    try{
        dispatch({type: UPDATE_Password_Request});
        console.log("UPDATE_Password post")
  
        const {data} =await axios.put(`/api/v1/password/update`,NEWPasswordData);
        console.log('Updated Password',data)
       
        dispatch({
            type:UPDATE_Password_success,
            payload:true
        })

    }
    catch(error)
    {
        dispatch({type:UPDATE_Password_fail,payload:error.response.data.message})
    }

}




//Forget Password Action 

export const forgetPassword=(Email)=> async (dispatch)=>{

    try{

        dispatch({type: FORGET_Password_Request});
        console.log("Forget_Password post",Email.email)
  
        const {data} =await axios.post(`/api/v1/password/forget`,Email);
        console.log('Forget Password',data)
       
        dispatch({
            type: FORGET_Password_success,
            payload:data.message
        })



    }
    catch(error)
    {
        dispatch({type:FORGET_Password_fail,payload:error.response.data.message});
    }
}


//Reset Password : 

export const userPasswordReset =(passwords,token)=>async (dispatch)=>{

  

    try{

        dispatch({type: RESET_Password_Request});
        console.log("Reset_Password post")
  
        const {data} =await axios.put(`/api/v1/password/reset/${token}`,passwords);
        console.log('Reset Password',data)
       
        dispatch({
            type: RESET_Password_success,
            payload:data.success
        })



    }
    catch(error)
    {
        dispatch({type:RESET_Password_fail,payload:error.response.data.message});
    }

}




export const ClearError=()=>async(dispatch)=>{

    dispatch({
        type:Clear_errors
    })
}


//Get All Users for ADMIN


export const GetAdminUserList=()=>async(dispatch)=>{

    try{
        dispatch({
            type: Get_User_Request
        })

        const {data}= await axios.get("/api/v1/admin/Users")

        console.log(data)

        dispatch({
            type: Get_User_success,
            payload: data.AllUsers
        })

    }
    catch(error)
    {
        dispatch({
            type: Get_User_fail,
            payload: error.response.data.message,

            
        })
    }

}


//Admin Delete User
export const DeleteUser = (id)=>async(dispatch)=>{

    try{
        dispatch({type: Delete_User_Request});
        console.log("Delete_User_Request post")
  
        const {data} =await axios.delete(`/api/v1/admin/delete_user/${id}`);

        console.log(data)
    
        dispatch({
            type:Delete_User_success,
            payload:data.success
        })

    }catch(error)
    {

       console.log("err",error)

        dispatch({
            type:Delete_User_fail,
            payload: error.response.data.message,

            
        })
    }
}



//To get User specific Information
export const UserDetailFetcher =(id)=>async(dispatch)=>{

    try{
        dispatch({type: Get_Specific_User_Detail_REQUEST})
        console.log("User Info Lene Aa gaya")

        const {data} = await axios.get(`/api/v1/admin/Users/${id}`);

        console.log("Info AA gaya",data.SingleUserInfo);

        dispatch({
            type:Get_Specific_User_Detail_SUCCESS,
            payload:data.SingleUserInfo,
        })
    }
    catch(error)
    {
        dispatch({
            type:Get_Specific_User_Detail_FAIL,
            payload:error.response.data.message
        })
    }

}