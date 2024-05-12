const UserService = require('../services/user-service')
const ProductService = require('../services/product-service')
const fs = require('fs')
const {AuthUser} = require('./middleware')
const {IsUserAuthenticated,AuthoriseRole} = AuthUser



module.exports =(app)=>{

    const user_service = new UserService();
    const product_service = new ProductService()

    //Registering User
    app.post('/user/register',async(req,res,next)=>{

        try{
    
            console.log("Registering the User \n")

            const {email,name,password} = req.body;

            if(!email || !name || !password){

                res.status(401).send({
                    status:false,
                    message:`All required fields are not filled!`
                })

                return ;
            }

            const response = await user_service.SignUp(req.body,res)
            return res.status(200).json(response);


        }catch(error){

            console.log('SignUp Error',error)

            res.status(500).send({
                status:false,
                message:`Failed to create user due to ${error.errMsg}`
              })

        }

    })
    

    //Login User
    app.post('/user/login',async(req,res)=>{

        try{

            console.log("Initiated Login!")

            const {email,password} = req.body

            if(!email || !password){

                res.status(401).send({
                    status:false,
                    message:`Email or Password Fields can't be empty!`
                })

                return ;
    
            }

            const response = await user_service.SignIn(req.body,res)
            return res.status(200).json(response);


        }catch(error){

            console.log('SignIn Error',error)
            res.status(404).send({
                status:false,
                message:`Failed to login user ${error.errMsg}`
            })

            // next(error)
        }

    })


    //LogOut User
    app.post('/user/logout',async(req,res,next)=>{

      try{

        await user_service.SignOut(res);
    
        return res.status(200).json({
            success:true,
            auth:false,
            message:"Logged Out Successfully"
        })

      }catch(error){

        res.status(404).send({
            status:false,
            auth:true,
            message:`Unable to logout ${error.errMsg}`
        })
      }

    })


    //Get Profile Details - this can be done only if logged in
    app.get('/user/myprofile',IsUserAuthenticated, async(req,res,next)=>{

        try{

            console.log('Fetching User Profile')

            const user = await user_service.GetProfile(req.user._id);

            return res.status(200).json({
                success:true,
                user
            })


        }catch(error){

            console.log('Profile fetching Error',error)
            res.status(404).send({
                status:false,
                message:`Failed to fetcg user detail ${error.errmsg}`
            })

            // next(error)
        }

       

    })


    /*Update your Profile Details - this can be done only if logged in */
    app.put('/user/update/myprofile',IsUserAuthenticated, async(req,res,next)=>{

        try{

            console.log('Updating User MyProfile')

            let Body = req.body;
            
            if(Body.hasOwnProperty('role'))
                delete Body['role'];
        
            if(Body.hasOwnProperty('email'))
                delete Body['email'];

            // console.log(Body)
                

            const user = await user_service.UpdateUserProfile(req.user._id,Body);

            return res.status(200).json({
                success:true,
                message:'User Profile updated successfully!',
                user
            })


        }catch(error){

            console.log('My Profile Updating Error',error)
            res.status(404).send({
                status:false,
                message:`Failed to update myprofile detail due to ${error.errmsg}`
            })

            // next(error)
        }

       

    })




    //Get All User's Information  --Admin Only
    app.get('/user/admin/all/profiles',IsUserAuthenticated,AuthoriseRole("admin"), async(req,res,next)=>{

        try{

            
            const AllUsers = await user_service.GetProfile('*')

            res.status(200).json({
                success:true,
                AllUsers
            })

           


        }catch(error){

            console.log('All Profile fetching Error',error)
            res.status(404).send({
                status:false,
                message:`Failed to fetcg user detail ${error.errmsg}`
            })

            // next(error)
        }

    })


    
    //Get Specific User's Information   --Admin Only
    app.get('/user/admin/:id',IsUserAuthenticated,AuthoriseRole("admin"), async(req,res,next)=>{

        try{


            const target_id = req.params.id;
            
            const target_user = await user_service.GetProfile(target_id)

            res.status(200).json({
                success:true,
                target_user
            })

           


        }catch(error){

            console.log('target Profile fetching Error',error)
            res.status(404).send({
                status:false,
                message:`Failed to fetch target user detail ${error.errmsg}`
            })

            // next(error)
        }

    })



    /*Update The User Role  --Admin Only Access*/
    app.put('/user/admin/role/update/:id',IsUserAuthenticated,AuthoriseRole("admin"), async(req,res,next)=>{

        try{


            const target_id = req.params.id;
            const new_role = req.body.role;
            
            const user_target = await user_service.UpdateUserRole(target_id,new_role);
            
            res.status(200).json({
                success:true,
                message:"Successfully changed the userType role."
            })
           


        }catch(error){

            console.log('Updating user Role Error',error)
            res.status(404).send({
                status:false,
                message:`Failed to update user role ${error.errmsg}`
            })

            // next(error)
        }

    })



    /* Delete The User   --ADMIN Only */
    app.delete('/user/admin/delete_user/:id',IsUserAuthenticated,AuthoriseRole("admin"), async(req,res,next)=>{

        try{

            const target_id = req.params.id;

            const user_target = await user_service.DeleteUser(target_id);
           
            res.status(200).json({
               success:true,
               message:"User Removed Successfully"
            })
           
        


        }catch(error){

            console.log('Deleting user Error Occured',error)
            res.status(404).send({
                status:false,
                message:`Failed to delete user ${error.errmsg}`
            })

            // next(error)
        }

    })


    


}