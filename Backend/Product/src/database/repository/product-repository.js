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
            // console.log('hi',productID)

            let target_product,AllProducts;

            if(productID!=='*')
            target_product = await ProductSchema.findOne({_id:productID});
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
 
            if(!Product_target){
                throw "Product Not Found to delete"
            }
         
        
            await Product_target.deleteOne();
       

        }catch(error){
 
          throw error
 
        }
     }

     async updateProduct(productID,body){

        try{

            let product = await ProductSchema.findById(productID)

            if(!product){
                    
                throw new Error('Unable to find out target product!') 
                   
            }
            
            product = await ProductSchema.findByIdAndUpdate(productID,body,{
                new:true,
                runValidators:true,
                useFindAndModify:false
            })

        }catch(error){

            throw error
        }
     }
    
}

module.exports = ProductRepository;