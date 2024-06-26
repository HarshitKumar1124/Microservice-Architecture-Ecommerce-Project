const express = require('express')
const cors = require('cors')
const Dotenv = require("dotenv");
const {PORT} = require('./config/config.env')

const {order} = require('./api')
const {AuthUser} = require('./api/middleware')

const cookieParser = require('cookie-parser')

module.exports = async (app)=>{

    app.use(express.json());
    app.use(cors({
        origin:"http://localhost:3000",
        credentials:true
    }))
    
    //config dotenv environment
    Dotenv.config({path:'./config/config.env'})

    /*Storing Cookies */
    app.use(cookieParser())

    
    //api
    order(app)


    const PORT = process.env.PORT || 8003
    

    app.listen(PORT,()=>{

        console.log(`Order Server is running on PORT : ${PORT}`)

    }).on('error',(error)=>{

        console.log(error)
        process.exit();
    })

}