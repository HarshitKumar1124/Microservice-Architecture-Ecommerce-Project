const { UserSchema } = require('../models');

// Dealing With database Operations
class UserRepository {

    async RegisterUser({name,email,password}){
         
        try{
            const new_user = await UserSchema.create({
                name,
                email,
                password,
                profilePic:{
                    // public_ID:mycloud.public_id,
                    // image_url:mycloud.secure_url
                    public_ID:"ABCD",
                    image_url:"XYZ"
                },
                visible_password:password
        
            });
    
            return new_user;

        }catch(error){

            // console.log(`error in registering user -- repository file --- due to ${error}`)
            throw {errMsg:error.message}

        }


    }


    async LoginUser({email,password}){
         
        try{

            const target_user = await UserSchema.findOne({email:{$regex:email,$options:'i'}})

            if(!target_user){
                return {
                    status:false,
                    message:"User Not Registered !",
                    code:401
                }
            }

            

            const isPasswordMatch = await target_user.comparePassword(password);

           

            if(!isPasswordMatch){
               
                return {
                    status:false,
                    message:"Invalid email or password",
                    code:401
                }
            
            }

          

            return {
                status:true,
                message:"login successfull",
                code:200,
                user:target_user
            };

        }catch(error){

            // console.log(`error in registering user -- repository file --- due to ${error}`)
            throw error

        }


    }


    async GetUserProfile(id){

       try{

        if(id==='*')
        return await UserSchema.find()

        const target = await UserSchema.findById(id)

        if(!target){
            throw `No records found of target user!`
        }

        
        return target;

       }catch(error){

         throw error

       }
    }

    // By logged in user Only.
    async UpdateUserProfile(id,new_body){

        try{
 
            const user_target = await UserSchema.findByIdAndUpdate(id,new_body,{
                new:true,
                runValidators:true,
                useFindAndModify:false
            })
            
            await user_target.save();


        }catch(error){
 
          throw error
 
        }
     }


    // By admin Only.
    async UpdateUserRole(id,new_role){

        try{
 
            const user_target = await UserSchema.findByIdAndUpdate(id,{userType:new_role},{
                new:true,
                runValidators:true,
                useFindAndModify:false
            })
            
            await user_target.save();


        }catch(error){
 
          throw error
 
        }
     }



     //By admin Only.
     async DeleteUser(id){

        try{

            const user_target = await UserSchema.findById(id)
 
            if(!user_target)
            return next(new Error("User Not Found to delete",401));
        
            await user_target.deleteOne();
       

        }catch(error){
 
          throw error
 
        }
     }





    
}

module.exports = UserRepository;