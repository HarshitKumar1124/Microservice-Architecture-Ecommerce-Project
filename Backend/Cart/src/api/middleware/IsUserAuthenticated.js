
const jwt = require("jsonwebtoken")


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

    // console.log('yaaaha',decodedData)

    req.user=decodedData;

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

        if(role!==req.user.userType)
        {

          res.status(401).send({
            auth:false,
            message:`Role: ${req.user.userType} is not allowed`
          })
            
            return next(new Error(`Role: ${req.user.userType} is not allowed`))
        }

        next();
    }
}
