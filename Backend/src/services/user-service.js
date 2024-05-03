const { UserRepository , ProductRepository} = require("../database");
const sendToken = require("../utils/JWTToken");
const fs = require('fs')




// All Business Logics related to Users is presen here.
class UserService{

    constructor(){

        this.repository = new UserRepository();
        this.productRepository = new ProductRepository();

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

         //******since using local_storage for cookies*************************** */
        //**we will empty the cookie_local_storage.txt file*************************** */
        // console.log('signout service lyer')


        // fs.writeFile("cookie_local_storage.txt","",(err)=>{

        //    if(err)
        //    throw {errmsg:err}

        // })

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

    /*Have to continue from here */
   async CreateUpdateReview(current_review,user_id,productID){

      
    try{

        const target_product = await this.productRepository.GetProduct(productID)

        let isReviewed=false;

        console.log('hello yh tk y')

        await target_product.reviews.forEach((rev)=> {
            
            if(rev.user_Id.toString()==user_id)
            isReviewed=true;
        
        });


        let review_status = 'Added'
        let numberOfReviews= target_product.numberOfReviews;

        if(isReviewed)
        {
            review_status = "Updated";
            //if already reveiwed then update the previous review by new one
    
            await this.productRepository.UpdateReview(productID,current_review);
            numberOfReviews++;

            //compute rating and new review
        }
        else
        await this.productRepository.AddReview(current_review,productID)
        // chnge number of reviews in dtbse


        let sum=0;
        target_product.reviews.forEach((rev)=>{
           sum=sum + parseInt(rev.rating);
        });

        let new_rating = sum/numberOfReviews;

        await this.productRepository.UpdateField({rating:new_rating},productID)
        

    }catch(error){
    
        
        throw {errmsg:error}

    }


}
      
}


module.exports = UserService;