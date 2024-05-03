import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useAlert } from 'react-alert'
import MetaData from '../Layout/MetaData'
import { ClearError,GetAdminUserList} from "../../Redux_Actions/UserAction"
import DisplayUserList from "./DisplayUserList.js"

const Admin_UserList = () => {

  
  const dispatch = useDispatch();

  const alert = useAlert();

 const {loading,error,allUser} = useSelector((state)=>state.getUser);

  useEffect(()=>{
    if(error)
    {
        alert.error(error);
        dispatch(ClearError());

    }

    dispatch(GetAdminUserList());


},[dispatch,error,alert])



  return (
    <>
    <MetaData title="Admin | UserList"/>
    {
      loading?<h1>Loading</h1>:<>
      {
          allUser ?<DisplayUserList ToDisplay={allUser} item="Users"/>:<h1>No Users Yet</h1>
      }
      </>
    }
    </>
  )
}

export default Admin_UserList