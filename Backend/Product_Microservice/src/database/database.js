const mongoose = require("mongoose");

// using cloud hosted Database MongoDB - ATLAS

// cluster password -> hZfVSOEjMTpJ6EaD

// cluster User -> harshitkr1124

// mongodb+srv://harshitkr1124:hZfVSOEjMTpJ6EaD@dropinchatapp.nvx2nbf.mongodb.net/

const connectDatabase=async()=>{

    var DB_URI = "mongodb+srv://harshitkr1124:hZfVSOEjMTpJ6EaD@dropinchatapp.nvx2nbf.mongodb.net/Ecommerce-clone-app";
    
    mongoose.connect(DB_URI,{useNewURLParser:true}).then((data)=>{
        console.log(`MongoDB connected with the server: ${data.connection.host}`)}).catch((err)=>{
            console.log(`Error due to ${err}`);
        })
    


}
module.exports = connectDatabase;