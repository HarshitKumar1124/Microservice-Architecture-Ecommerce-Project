const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

    shippingInfo :{

        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        pinCode:{
            type:Number,
            required:true,
            maxlength:[6||"Please Enter Valid PINCode !"]
        },
        phoneNo:{
            type:Number,
            required:true,
            minlength:[10||"Please Enter the 10 dihit valid Number"]
        }
    },



    orderItem:[{

       
        quantity:{
            type:Number,
            required:true
        },
        productID:{
            type:mongoose.Schema.ObjectId,
            ref:"products",
            required:true
        },
        price:{
            type:Number,
            required:true
        }

    }],

    // paymentInfo:{

    //     id:{
    //         type:String,
    //         required:true

    //     },
    //     status:{
    //         type:String,
    //         required:true
    //     }

    // },

    // paidAt:{
    //     type:Date,
    //     required:true

    // },

    itemsPrice:{
        type:Number,
        default:0,
        required:true

    },

    
    shippingPrice:{
        type:Number,
        default:0,
        required:true

    },
    
    totalPrice:{
        type:Number,
        default:0,
         required:true

    },

    orderStatus:{
        type:String,
        default:"Processing",
        required:true

    },

    createdBy:{
      
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now,

    }

});



module.exports = mongoose.model("orders",OrderSchema);


// In Mongoose, when you compare two ObjectId instances using the === operator, it will return false, even if the two ObjectId instances represent the same MongoDB ObjectId value. This behavior occurs because each ObjectId instance is a unique object reference in memory.