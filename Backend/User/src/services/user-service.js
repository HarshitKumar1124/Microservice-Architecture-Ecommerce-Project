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


   /* =================== Subscribed App-Events Functionalities ===================== */


   async AddOrder(data,user){

    try{
        // console.log('Add order triggered!')

        await this.repository.AddOrder(data,user);
        console.log('Added Order Successfully to UserSchema');

    }catch(error){

        console.log(`Failed to add order to userSchema List due to ${error}`)
        throw {errMsg:error}
    }
}


async RemoveOrder(data,user){

    try{
        await this.repository.RemoveOrder(data,user);
        console.log('Removed the order successfully!')

    }catch(error){
        
        console.log(`Failed to remove order to userSchema List due to ${error}`)
        throw {errMsg:error}
    }
}




/* To communicate with the other Microservices */
async subscribeEvents(payload,user){

   try{
    const {event,data} = payload;

        switch(event){
            case 'TEST_EVENT':
                console.log('Testing Subscriber in USER!')
                return;
            case 'ADD_ORDER':
                console.log(`Network Call to add the orderID in userSchema with data`);
                this.AddOrder(data,user);
                return;
            case 'REMOVE_ORDER':
                console.log('Network Call to remove the orderID in userSchema with data');
                this.RemoveOrder(data,user);
                return;
        
        }

   }catch(error){

    console.log( `Failed Event due to ${error}`)
    
   }

}


}


module.exports = UserService;