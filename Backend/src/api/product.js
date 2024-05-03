const ProductService = require('../services/product-service.js')
const {AuthUser} = require('./middleware')
const {IsUserAuthenticated,AuthoriseRole} = AuthUser


module.exports = (app)=>{

    const product_service = new ProductService()



    /* Create or Add a new Product   -- By Admin Only */ 
    app.post('/user/admin/product/new',IsUserAuthenticated,AuthoriseRole("admin"),async(req,res,next)=>{


        try{

            const {

                name,
                description,
                price,
                category,
                stock


            } = req.body

            if(!name || !description || !price || price=="0" || !category || !stock){

                res.status(401).send({
                    success:false,
                    message:`Required Fields are not filled.`
                })
            }

            const productBody = {
                name,
                description,
                price,
                category,
                stock,
                createdByUser:req.user._id
            }

            const data = await product_service.CreateProduct(productBody)

            res.status(200).json(data)
        
    
        }catch(error){

            console.log(`Unable to create product due to ${error}`)

            res.status(500).json({
                success:false,
                message: `Unable to create product due to ${error}`
            })
        
    
        }
        
    })



     /* Get All Product */ 
     app.get('/products',async(req,res,next)=>{


        try{

            const ProductToShow_PerPage = 20;

            const product_count = await product_service.CountProducts()
        
            // const Apifeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(ProductToShow_PerPage);
            // const Allproducts = await Product.find();
            //  or we cn write now as:
            // console.log('ss')
            // const Allproducts = await Apifeature.query;
            const Allproducts = await product_service.GetProduct('*')

            // console.log(Allproducts)



            if(!Allproducts)
            { 
                //!Allproducts never gets Null dont know why
                return next(new ErrorHandler("Products Not Found",500));
            }
            
            res.status(200).json({
                success:true,        
                Allproducts,
                productsCount:product_count,
                ProductToShow_PerPage
              });
            
        
    
        }catch(error){

            console.log(`Unable to get all products due to ${error}`)

            res.status(500).json({
                success:false,
                message: `Unable to get all products due to ${error}`
            })
        
    
        }
        
    })


     /* Get Specific Product */ 
     app.get('/product/:id',async(req,res,next)=>{


            try{

                const target_product = await product_service.GetProduct(req.params.id)



                if(!target_product)
                {

                    res.status(401).send({
                        success:false,
                        message:`Target Not Found!`

                    })
                 
                    return next(new ErrorHandler("Target Product Not Found",500));
            
                }
            
            res.status(200).json({
                success:true,
                product:target_product
            })
                    
        
    
        }catch(error){

            console.log(`Unable to get target product due to ${error}`)

            res.status(500).json({
                success:false,
                message: `Unable to get target product due to ${error}`
            })
        
    
        }
        
    })


     //Delete The product   --ADMIN Only
     app.delete('/user/admin/delete_product/:id',IsUserAuthenticated,AuthoriseRole("admin"), async(req,res,next)=>{

        try{

            const target_id = req.params.id;

            await product_service.DeleteProduct(target_id);
           
            res.status(200).json({
               success:true,
               message:"Product Removed Successfully"
            })
           
        


        }catch(error){

            console.log('Deleting product Error Occured',error)
            res.status(404).send({
                status:false,
                message:`Failed to delete product ${error.errmsg}`
            })

            // next(error)
        }

    })


}