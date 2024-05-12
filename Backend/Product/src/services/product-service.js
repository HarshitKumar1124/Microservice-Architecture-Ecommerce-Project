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

}

module.exports = ProductService