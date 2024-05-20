const {CartRepository} = require('../database')


class CartService {

    constructor(){
    this.repository = new CartRepository();
    }


    async createCart(data,user){

        const cart = {
            ...data,
            createdBy:user._id
        }

        try{

            await this.repository.addCart(cart);
            
        }catch(error){

            throw {errMsg:error}
        }
    }







    /* To communicate with the other Microservices */
async subscribeEvents(payload){

    try{
     const {event,data,user} = payload;
 
         switch(event){
             case 'TEST_EVENT':
                 console.log('Testing Subscriber in USER!')
                 return;
             case 'ADD_TO_CART':
                 console.log(`Network Call / Message Broker SubscribeEvents to add to cart  create cart in CartSchema with data`);
                 this.createCart(data,user);
                 return;
         
         }
 
    }catch(error){
 
     console.log( `Failed Event due to ${error}`)
     
    }
 
 }

}

module.exports = CartService