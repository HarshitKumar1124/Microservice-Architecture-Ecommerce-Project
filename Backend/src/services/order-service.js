const {OrderRepository} = require('../database')

class OrderService{

    constructor(){

        this.repository = new OrderRepository();
    }

    async createOrder(body){

        try{

            const order = await this.repository.createOrder(body)

            return order;
        }
        catch(error){

            throw {errMsg:error}
        }

    }
}

module.exports = OrderService