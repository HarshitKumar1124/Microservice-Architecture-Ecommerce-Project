const mongoose = require('mongoose') 


// validator - For checking Parameters are rightly given or not by user. Eg: Number of phone is 10 or not.. Mail ID has @ or not

const validator = require('validator')


//For Encryption of Password

const bcrypt = require('bcryptjs')


//
const jwt = require('jsonwebtoken')


//Used for RESETing password
const crypto = require('crypto')



const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength:[50,"Name Must Not Exceed 50 Characters"],
        minlength:[4,"Name Must be atleast 4 Characters"]

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please Enter The Valid Email"]

    },
    
    userType:{
        type:String,
        default:"user"
    },

    password:{
        type:String,
        required:[true,"Password Enter your password"],
        minlength:[8,"Password must atleast be 8 Character"],
        // select:false, //select parameters refers to  the state that on being called , all field of information of user will be given if select parameter is by default true.
         
    },
    visible_password:{
        type:String,
        required:[true,"Password Enter your password"],
        minlength:[8,"Password must atleast be 8 Character"],
        select:false,
         
    },
    profilePic:{

        public_ID: {
            type: String,
            required: true,

        },
        image_url: {
            type: String,
            required: true,
        }
    },
    orders:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"orders"
            
        }
    ],
    wishlist:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"products"
           
        }
    ],
    cart:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"products",
           

            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    shippingInfo:{

        Locality:{
            type: String,
            default:"",
        },

        CountryName:{
            type:String,
            default:""
        },

        City:{
            type:String,
            default:"",
        },

        State:{
            type:String,
            default:"",
        },
        Pincode:{
            type:Number,
            default:0,
            maxlength:[6,"Please Enter Valid 6 Digit PIN Code"]

        },
        Contact:{
            type:Number,
            default:0,
            maxlength:[10,"Enter 10 Digit Mobile Number"]
        }
    },

    socialHandles:{

        LinkedIN:{
            type:String,
            default:""
        },

        GitHub:{
            type:String,
            default:""

        },
    },

    resetPasswordToken:{
        type:String,
        default:""
    },
    resetPasswordExpire:{
        type:Date,
        default:""
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


UserSchema.pre("save",async function(next){

    //  console.log("hiii")
    //incase of updating if password is not modified then it will hash the already hashed password
    if(!this.isModified('password')){                        
        next();
    }


    const hash  = await bcrypt.hash(this.password,10);

    this.password = hash;
})



//JWT Token -- Responsible for Remen=mbering cookie of User to Identify its authenticity.
// It allows the limited mentioned User to fetch specific APIs

process.env.JWT_Expires = "5d";
process.env.JWT_SECRET = "ILYSM"


UserSchema.methods.getJWTToken=function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_Expires,
    })
}


//Compare Password
UserSchema.methods.comparePassword=async function(inputPassword)
{
   
    const val = await bcrypt.compare(inputPassword,this.password);
    
    return val
}




module.exports = mongoose.model("Users",UserSchema);