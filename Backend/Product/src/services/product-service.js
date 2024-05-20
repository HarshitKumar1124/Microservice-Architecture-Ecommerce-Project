const { ProductRepository } = require("../database");


// All Business Logics related to Users is presen here.
class ProductService{

    constructor(){

        this.repository = new ProductRepository();
       
    }

    // Create New Product
    async CreateProduct(productBody){

        try{

            const new_Product = await this.repository.AddProduct(productBody);
    
            return  {
                success:true,
                product:new_Product
            }

        }catch(error){

           console.log(`Error in creating Product --- service file -- due to ${error}`)
           throw error
        }

    }


    // Count Products
    async CountProducts(){

        try{

            return await this.repository.CountProducts();

        }catch(error){

           console.log(`Error in counting Products --- service file -- due to ${error}`)
           throw error
        }

    }


    // Get Product
    async GetProduct(productID){

        try{
           
            return await this.repository.GetProduct(productID);

        }catch(error){

           console.log(`Error in fetching Products --- service file -- due to ${error}`)
           throw {errMsg:error}
        }

    }


    // delete the Product -- By Admin Only
   async DeleteProduct(id){

      
    try{

        return await this.repository.DeleteProduct(id)

    }catch(error){
    
        
        throw {errmsg:error}

    }

   

    }


    /* Update the product */
    async updateProduct(productID,body){

        try{

             await this.repository.updateProduct(productID,body);

        }catch(error){

            throw {errMsg:error}
        }

    }


     /* App Events Functionality */
     async DoesProductExist(orderItem){

        // console.log('Check Existance ',orderItem)
        
            const values =  orderItem.map(async(item)=>{
            
            try{
                const product = await this.repository.GetProduct(item.productID)
                return item
                
            }catch(error){

                console.log('kuch get product karne mein error aaya',error,item.productID)
    
            }
            // console.log(Date.now())
        })

        let existingOrderItem = await Promise.all(values)

        existingOrderItem = existingOrderItem.filter(item=> item!==undefined)

        // console.log(existingOrderItem,Date.now())
        return existingOrderItem
   

    }



    /* Defining the subscriber for network communication from other microservices */
    async subscribeEvents(payload){

        const {event,data} = payload;

        switch(event){
            case 'CHECK_PRODUCT_EXIST':
                console.log(`check if product exist Network Calls / Message Broker Subscriber -  ${data.orderItem}`)
                return await this.DoesProductExist(data.orderItem);
        }

    }

}

module.exports = ProductService