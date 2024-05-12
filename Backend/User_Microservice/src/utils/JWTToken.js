
const fs= require('fs')


//Creating Token and Storing in Cookies


const sendToken = (user,res)=>{

    const token = user.getJWTToken();

    //Options_For_Cookies
    // const COOKIE_EXPIRE = 1;  //number of days in which cookie get expired
    // const options ={
    //     httpOnly:true,
    //     expires:new Date(
    //         Date.now() + COOKIE_EXPIRE*24*60*60*1000
    //     )
    // }


      res.cookie("JWT_TOKEN",token,{
            expires: new Date(Date.now() + 3600000),  // 1hrs
            httpOnly:true,
            secure:false //important so as to store cookie 
        })

    //cookie-parser was not working thus used Local Cookie Storage
    // fs.writeFile('cookie_local_storage.txt', token, function (err) {
    //     if (err) throw err;
    //     else
    //     console.log('Saved!');
    //   });

    return token

     
};


module.exports = sendToken;