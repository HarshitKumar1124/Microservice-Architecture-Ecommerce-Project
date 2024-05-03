const { ProductSchema } = require('../models')

class ProductRepository {


    async AddProduct (productBody){

        try{
             
            return await ProductSchema.create(productBody);;

        }catch(error){

            console.log(`error in create Producr -- repository file --- due to ${error}`)
            throw error

        }
    }

    async CountProducts(){

        try{
             
            return await ProductSchema.countDocuments();

        }catch(error){

            console.log(`error in countingProducts -- repository file --- due to ${error}`)
            throw error

        }

    }

    async GetProduct (productID) {

        try{

            let target_product,AllProducts;

            if(productID!=='*')
            target_product = await ProductSchema.findById(productID);
            else
            AllProducts = await ProductSchema.find()

            if(productID!=='*' && !target_product){

                throw new Error('Unable to find the  Product !');
            }

            if(productID=='*')
            return AllProducts

            return target_product


        }catch(error){

            throw `Unable to fetch  product due to ${error}`;

        }

    }

    
    /* Delete the Product --- By Admin */
    async DeleteProduct(id){

        try{

            const Product_target = await ProductSchema.findById(id)
 
            if(!Product_target)
            return next(new Error("Product Not Found to delete",401));
        
            await Product_target.deleteOne();
       

        }catch(error){
 
          throw error
 
        }
     }
    
}

module.exports = ProductRepository;