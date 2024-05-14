const express = require('express')
const cors = require('cors')
const Dotenv = require("dotenv");
const {PORT} = require('./config/config.env')

const {cart} = require('./api')

const cookieParser = require('cookie-parser')

module.exports = async (app)=>{

    app.use(express.json());
    app.use(cors({
        origin:[
            "http://localhost:3000", /* For Frontend */
        ],
        credentials:true
    }))
    
    //config dotenv environment
    Dotenv.config({path:'./config/config.env'})

    /*Storing Cookies */
    app.use(cookieParser())

    
    //api
    cart(app) 

    // /* Listen to Other Microservice App-Events */
    // appEvents(app)

    const PORT = process.env.PORT || 8004

    app.listen(PORT,()=>{

        console.log(`Cart Microservice Server is running on PORT : ${PORT}`)

    }).on('error',(error)=>{

        console.log(error)
        process.exit();
    })

}