const {CartSchema} = require('../models')

class CartRepository {

    async addCart(body){

        try{

            const cart = await CartSchema.create(body)

        return cart;

        }catch(error){

            throw error
        }
    }

}

module.exports = CartRepository