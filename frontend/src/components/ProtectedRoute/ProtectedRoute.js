import React, {  Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Navigate as Redirect,Route} from "react-router-dom"

const ProtectedRoute = ({element:Component , ...rest}) => {

    const {loading,isAuthenticated,user} = useSelector((state)=> state.loginUser)

  return (
    <Fragment>
          {
            !loading&&(
              <Route {...rest} render={(props)=>{
                if(!isAuthenticated)
                return <Redirect path="/login_signup"/>
                return <Component {...props}/>
              }}
              />
            )
          }
    </Fragment>
  )
}

export default ProtectedRoute