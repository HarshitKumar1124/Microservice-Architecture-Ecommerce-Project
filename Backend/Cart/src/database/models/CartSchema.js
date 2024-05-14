const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
   
    productID:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"products"
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:true
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    }
})


module.exports = mongoose.model("cartItem",cartSchema);