const mongoose = require('mongoose') ;

const validator = require('validator')


const cartitem = new mongoose.Schema({
    productID:{
    type:mongoose.Schema.ObjectId,
    required:true
},
userCreated_ID:{
    type:mongoose.Schema.ObjectId,
    required:true
},
productName:{
    type:String,
    required:true
},
productPrice:{
    type:Number,
    reuired:true,

},
productImage:{
    image_url:{
        type:String,
        default:""
    },
},
productCartQuantity:{
    type:Number,
    required:true
}
})



module.exports = mongoose.model("cart",cartitem);





