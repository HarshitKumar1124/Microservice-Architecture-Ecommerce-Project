const ErrorHandler = require("../../utils/errorHandler");

const fs = require('fs')

const jwt = require("jsonwebtoken")

const User = require("../../database/models/UserSchema");


//To store the information of the Logged In User
var loginUserInfo;


exports.IsUserAuthenticated = async(req,res,next)=>{

//Fetching stored token from cookie 
   try{
    // console.log(req.cookies)
    const  token  = req.cookies.JWT_TOKEN;
    // console.log("Auth" , token)

     //Fetching Current token from Local_cookie_storage file
    // const token=fs.readFileSync("cookie_local_storage.txt","utf8")

    // console.log(`current token fetched from local_cookie_storage is: ${token}`)

    if(!token)
    {
        // console.log("error de raha")
        res.status(401).send({
          auth:false,
          message:'Please Login First to use this resource'
        })

        return next(new Error('Please Login First to use this resource',401))

    }

    var JWT_SECRET ="ILYSM"


    const decodedData = jwt.verify(token,JWT_SECRET);

    // console.log(decodedData)

    loginUserInfo= await User.findById(decodedData.id) 

    req.user=loginUserInfo;

    next();




   }catch(error){

    // console.log("error de raha")
    res.status(401).send({
      auth:false,
      message:`Un-Authenticated User. LOGIN Again!`
    })

   }

};


exports.AuthoriseRole=(role)=>{
    return (req,res,next)=>{


        // console.log(loginUserInfo,role)

        if(role!==loginUserInfo.userType)
        {

          res.status(401).send({
            auth:false,
            message:`Role: ${loginUserInfo.userType} is not allowed`
          })
            
            return next(new Error(`Role: ${loginUserInfo.userType} is not allowed`))
        }

        next();
    }
}
