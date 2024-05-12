// this coressponds to app.js

const express= require("express");
const {PORT} = require('./config/config.env')
const {databaseConnection} = require('./database')
const expressApp = require('./express-app')


const StartServer = async()=>{

    const app = express();

    await databaseConnection();

    await expressApp(app);

}


StartServer();