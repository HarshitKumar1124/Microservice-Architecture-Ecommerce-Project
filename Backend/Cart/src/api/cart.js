const CartService = require('../service/cart_service')
const {AuthUser} = require('./middleware')
const {IsUserAuthenticated} = AuthUser
const {PublishProductEvents} = require('../utils/eventPublisher')


module.exports = (app)=>{

    const cart_service = new CartService()

    /* Microservice Server Check */
    app.get('/',(req,res)=>{

        res.status(200).send({
            message:"Cart Microservice is working live on Port 8004"
        })

        console.log('Cart Microservice is working live on Port 8004')
    })

    /* Create and Add a product in cart items */
    app.post('/addCart',IsUserAuthenticated,async(req,res,next)=>{

        try{
    
            console.log("Adding the product to cart item of User \n")

            const {productID,quantity} = req.body;

            if(!productID || quantity===0){

                res.status(401).send({
                    status:false,
                    message:`Invalid addition of cart item!`
                })

                return ;
            }

            /* Need to check if that product exists or not */
            const val = await PublishProductEvents({
                event:'CHECK_PRODUCT_EXIST',
                data:{
                    productID
                }
            },()=>{
                console.log('Does Product exist ?',val)
            })
           
            console.log('Does Product exist ?',val)


            const cart = await cart_service.addCart(req.body,req.user)
            return res.status(200).json({
                status:true,
                cart,
                message:"Added item to cart successfully!"
            });


        }catch(error){

            res.status(500).send({
                status:false,
                message:`Failed to add the item to cart due to ${error.errMsg}`
              })

        }

    })

}