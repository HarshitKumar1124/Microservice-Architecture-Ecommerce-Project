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

}

module.exports = OrderRepository;