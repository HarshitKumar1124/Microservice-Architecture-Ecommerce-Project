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


    async getOrder(orderID,user){

        try{
            

            const order = await this.repository.getOrder(orderID)

            if((order.createdBy !== user._id) && (user.userType !== 'admin'))
            throw {errMsg:`You are not Authorised for viewing other's order!`};

            return order;
        }
        catch(error){

            throw {errMsg:error}
        }

    }

    async getMyOrders(user){

        try{
            

            const orders = await this.repository.getMyOrders(user)
            return orders;
        }
        catch(error){

            throw {errMsg:error}
        }

    }
    async getAllOrders(){

        try{
            

            const orders = await this.repository.getAllOrders()
            // console.log(orders)

            return orders;
        }
        catch(error){

            throw {errMsg:error}
        }

    }

    async deleteOrder(orderID,user){

        try{
            

            const order = await this.repository.getOrder(orderID);

            if(!order){

                res.status(401).send({
                    status:false,
                    message:"unable to find the order!"
                })
            }

            // console.log(order.createdBy,'   ',user._id, order.createdBy===user._id)

            // In Mongoose, when you compare two ObjectId instances using the === operator, it will return false, even if the two ObjectId instances represent the same MongoDB ObjectId value. This behavior occurs because each ObjectId instance is a unique object reference in memory.

            // To compare two ObjectId instances for equality, you need to compare their hexadecimal string representations instead. The hexadecimal string representation of an ObjectId is accessible via its toString() method.
          
            if(order.createdBy.toString()===user._id.toString())
               {
                await this.repository.deleteOrder(orderID)
                return;
               }

            
            res.status(401).send({
                status:false,
                message:"unable to delete the order!"
            })


        }
        catch(error){

            throw {errMsg:error}
        }

    }
}

module.exports = OrderService