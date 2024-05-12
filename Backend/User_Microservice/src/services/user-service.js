const { UserRepository } = require("../database");
const sendToken = require("../utils/JWTToken");
const fs = require('fs')




// All Business Logics related to Users is presen here.
class UserService{

    constructor(){

        this.repository = new UserRepository();
    }

    async SignUp(userInputs,res){

       try{

        const newUser = await this.repository.RegisterUser(userInputs);

        const token = await sendToken(newUser,res);

        return  {
            success:true,
            newUser,
            token,
        }


       }catch(error){

        //    console.log(`Error in registering user --- service file -- due to ${error}`)
           throw {errMsg:error}
       }

        

    }


    async SignIn({email,password},res){

      

        try{
            
 
            const {status,user,message} = await this.repository.LoginUser({email,password});
    
            if(!status){
               
                throw {errMsg:`Unable to login due to ${message}`}
            }

            const token = await sendToken(user,res);

            return  {
                status:true,
                user,
                token,
            }

        }catch(error){
 
         //    console.log(`Error in registering user --- service file -- due to ${error}`)
            throw error
        }
 
         
 
    }



    async SignOut(res){

        try{

            res.clearCookie("JWT_TOKEN")
        
        }catch(error){

            throw {errMsg:error}
        }
    
    
    }


    // getProfile details  
    // getTargetProfile --- By admin
    // getAllProfile --- By Admin
    async GetProfile(id){

      
        try{
            
            return await this.repository.GetUserProfile(id)

        }catch(error){
         
            
            throw {errmsg:error}

        }
   
   
   }

   /* Update My Profile By Logged IN user*/
   async UpdateUserProfile(id,body){

      
    try{
        
        return await this.repository.UpdateUserProfile(id,body)

    }catch(error){
     
        
        throw {errmsg:error}

    }


}



   // Update the user role -- By Admin Only
   async UpdateUserRole(id,new_role){

      
        try{

            return await this.repository.UpdateUserRole(id,new_role)

        }catch(error){
        
            
            throw {errmsg:error}

        }


    }


   // delete the user -- By Admin Only
   async DeleteUser(id){

      
        try{

            return await this.repository.DeleteUser(id)

        }catch(error){
        
            
            throw {errmsg:error}

        }


    }

}


module.exports = UserService;