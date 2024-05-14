const {CartRepository} = require('../database')


class CartService {

    constructor(){
    this.repository = new CartRepository();
    }

    async addCart(body,user){

        const cart = {
            ...body,
            createdBy:user._id
        }

        try{

            const cartInstance = await this.repository.addCart(cart);
            return cartInstance;

        }catch(error){

            throw {errMsg:error}
        }
    }

}

module.exports = CartService