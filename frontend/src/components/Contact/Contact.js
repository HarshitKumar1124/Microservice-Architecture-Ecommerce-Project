import React from 'react'
import "./contact.css"
import { Link } from 'react-router-dom'

const Contact = () => {

  const email="HARSHITKR1124@GMAIL.COM";
  
  return (
    <>
    <div className='contact_Container'>
      <a href={`mailto:${email}`}><h1>CONTACT: <span style={{color:"red"}}>{email}</span></h1></a> 
    </div>
    </>
  )
}

export default Contact