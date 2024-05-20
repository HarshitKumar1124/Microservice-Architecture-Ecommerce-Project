const CartService = require('../service/cart_service')
const {AuthUser} = require('./middleware')
const {IsUserAuthenticated} = AuthUser
const {PublishProductEvents} = require('../utils/eventPublisher')

const {MQPublisher} = require('../utils/messageBroker')


module.exports = (app)=>{

    const cart_service = new CartService()
    const eventMessageBroker = new MQPublisher()

    eventMessageBroker.subscribeMessage('PRODUCT_EXCHANGE','CART_SERVICE',cart_service)

    /* Microservice Server Check */
    app.get('/',(req,res)=>{

        res.status(200).send({
            message:"Cart Microservice is working live on Port 8004"
        })

        console.log('Cart Microservice is working live on Port 8004')
    })


    

   

}