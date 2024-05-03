
const {AuthUser} = require('./middleware')
const {IsUserAuthenticated,AuthoriseRole} = AuthUser;

module.exports = (app)=>{

    //* Create New Order --Logged In */
    app.post('/order/new',IsUserAuthenticated,async(req,res,next)=>{

        try{
    
            // console.log("aaya",req.body)

            // const data = await user_service.SignUp(req.body)
            // return res.status(200).json(data);


        }catch(error){

            // console.log('SignUp Error',error)
            // res.status(500).send({
            //     status:false,
            //     message:`Failed to create user due to ${error.errmsg}`
            //   })
    
            // next(error)
        }

    })


    /* Get Details of Order By OrderID --- Admin Only */
    app.get('/order/:id',IsUserAuthenticated,AuthoriseRole,async(req,res,next)=>{

        try{
    
            // console.log("aaya",req.body)

            // const data = await user_service.SignUp(req.body)
            // return res.status(200).json(data);


        }catch(error){

            // console.log('SignUp Error',error)
            // res.status(500).send({
            //     status:false,
            //     message:`Failed to create user due to ${error.errmsg}`
            //   })
    
            // next(error)
        }

    })


    /* Get My Orders  --- Logged In */
    app.get('/orders/Myorder',IsUserAuthenticated,async(req,res,next)=>{

        try{
    
            // console.log("aaya",req.body)

            // const data = await user_service.SignUp(req.body)
            // return res.status(200).json(data);


        }catch(error){

            // console.log('SignUp Error',error)
            // res.status(500).send({
            //     status:false,
            //     message:`Failed to create user due to ${error.errmsg}`
            //   })
    
            // next(error)
        }

    })


     /* Get All User's Orders  --- Admin Only */
     app.get('/admin/orders',IsUserAuthenticated,AuthoriseRole,async(req,res,next)=>{

        try{
    
            // console.log("aaya",req.body)

            // const data = await user_service.SignUp(req.body)
            // return res.status(200).json(data);


        }catch(error){

            // console.log('SignUp Error',error)
            // res.status(500).send({
            //     status:false,
            //     message:`Failed to create user due to ${error.errmsg}`
            //   })
    
            // next(error)
        }

    })

    /* Delete the Order by OrderID  --- Logged In */
     app.delete('/order/delete/:id',IsUserAuthenticated,async(req,res,next)=>{

        try{
    
            // console.log("aaya",req.body)

            // const data = await user_service.SignUp(req.body)
            // return res.status(200).json(data);


        }catch(error){

            // console.log('SignUp Error',error)
            // res.status(500).send({
            //     status:false,
            //     message:`Failed to create user due to ${error.errmsg}`
            //   })
    
            // next(error)
        }

    })    

}


