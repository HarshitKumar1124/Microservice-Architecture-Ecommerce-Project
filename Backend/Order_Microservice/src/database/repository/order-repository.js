const {OrderSchema} = require('../models')

class OrderRepository{

    async createOrder(body){

        try{

            const order = await OrderSchema.create(body)

        return order;

        }catch(error){

            throw error
        }
    }


    async getOrder(orderID){

        try{
            

            const order = await OrderSchema.findById(orderID)

        return order;

        }catch(error){

            throw error
        }
    }

    async getAllOrders(){

        try{
            

            const orders = await OrderSchema.find()

        return orders;

        }catch(error){

            throw error
        }
    }

    async getMyOrders(user){

        try{

            const orders = await OrderSchema.find({createdBy:user._id})

        return orders;

        }catch(error){

            throw error
        }
    }


    async deleteOrder(orderID){

        try{
        
           await OrderSchema.deleteOne({_id:orderID})
 
        }catch(error){

            throw error
        }
    }

}

module.exports = OrderRepository;