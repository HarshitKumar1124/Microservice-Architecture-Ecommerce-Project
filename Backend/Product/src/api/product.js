const ProductService = require('../services/product-service.js')
const {AuthUser} = require('./middleware')
const {IsUserAuthenticated,AuthoriseRole} = AuthUser


module.exports = (app)=>{

    const product_service = new ProductService()

    /* Microservice Server Check */
    app.get('/',(req,res)=>{

        res.status(200).send({
            message:"Product Microservice is working live on Port 8002"
        })

        console.log('Product Microservice is working live on Port 8002')
    })



    /* Create or Add a new Product   -- By Admin Only */ 
    app.post('/admin/new',IsUserAuthenticated,AuthoriseRole("admin"),async(req,res,next)=>{


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
     app.get('/:id',async(req,res,next)=>{


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


     /* Delete the product   --ADMIN Only */
     app.delete('/admin/delete/:id',IsUserAuthenticated,AuthoriseRole("admin"), async(req,res,next)=>{

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

        }

    })

     /* Update the product   --ADMIN Only */
     app.put('/admin/update/:id',IsUserAuthenticated,AuthoriseRole("admin"), async(req,res,next)=>{

        try{
            
            const productID = req.params.id;

            if(!productID){

                res.status(401).send({
                    status:false,
                    message:"Target Product ID can't be empty"
                })

                return;
            }

           await product_service.updateProduct(productID,req.body)

           res.status(200).send({
            status:true,
            message:"Product Updated Successfully!"
           })


        }catch(error){

            console.log('Updating product Error Occured',error)
            res.status(404).send({
                status:false,
                message:`Failed to update product ${error.errMsg}`
            })
        }

    })


    /* Get reviews of the specified product ID */
    app.get('/reviews/:id',async(req,res)=>{

        const productID = req.params.id;

        if(!productID){

            res.status(401).send({
                status:false,
                message:"Invalid Product ID!"

            })

            return;
        }

        try{

            const product = await product_service.GetProduct(productID);
            

            res.status(200).send({
                status:true,
                reviews:product.reviews
            })

        }catch(error){

            res.status(500).send({
                status:false,
                message: `Unable to fetch the product reviews due to ${error.errMsg}`
            })
        }
        
        
    })


    /* Post / Update the Product Review by User --- LoggedIN  */
    app.put('/review/new/:id',IsUserAuthenticated,async(req,res)=>{

        const productID = req.params.id;

        if(!productID){

            res.status(401).send({
                status:false,
                message:"Invalid Product ID!"

            })

            return;
        }

        const current_review ={
            user_Id:req.user._id,
            name:req.user.name,
            rating:Number(req.body.rating),
            comment:req.body.comment
        }

        if(!req.body.comment){

            res.status(401).send({
                status:false,
                message:"Product review can't be empty!"
            })

            return;
        }


    try{

            const target_product = await product_service.GetProduct(productID)

            // console.log(target_product)
        
            // console.log("Product review ",target_product.reviews);
        
             let isReviewed=false;
        
            await target_product.reviews.forEach((rev)=> {
            
                console.log(rev.user_Id.toString(),req.user._id.toString())
                
                if(rev.user_Id.toString()==req.user._id.toString())
                isReviewed=true;
        
            });


            let review_status="Added";
            // console.log(isReviewed)
            
            if(isReviewed)
            {
                review_status = "Updated"
               
                //if already reveiwed then update the previous review by new one

                target_product.reviews.forEach((rev)=>{

                    // console.log(rev.user_Id.toString(),req.user.id.toString())
                    if(rev.user_Id.toString()===req.user.id.toString())
                    (rev.rating = current_review.rating),(rev.comment = current_review.comment);
                        
                })

            }
            else
            {

                //creatig new Review if not existing for specific user
                // console.log("hii",current_review,"hii")
                target_product.reviews.push(current_review)
                // console.log("review added",target_product.reviews,current_review)
                target_product.numberOfReviews = target_product.reviews.length;

            }



            let sum=0;
            target_product.reviews.forEach((rev)=>{
                sum=sum + parseInt(rev.rating);
                // console.log(rev.rating , sum)
            });
        

            target_product.rating =sum /target_product.numberOfReviews;


            // console.log(review_status)

            await target_product.save();

     
            res.status(200).json({
                success:true,
                message:review_status
            })


        }catch(error){

            res.status(500).send({
                status:false,
                message:`Unable to post the product review due to ${error.errMsg}`
            })
        }

    })


    /* Delete the Product Review by User --- LoggedIN */
    app.delete('/review/delete/:id',IsUserAuthenticated,async(req,res)=>{

        const productID = req.params.id;

        if(!productID){

            res.status(401).send({
                status:false,
                message:"Product ID can't be found!"

            })

            return;
        }


        try{

            const target_product = await product_service.GetProduct(productID)

            const AllReviews = target_product.reviews.filter((rev)=>{
    
           
                return ( rev.user_Id.toString() !== req.user._id.toString() );
        
            })


            if(AllReviews===target_product.reviews){

                res.status(500).send({
                    status:false,
                    message:`No review by user for this product!`
                })

                return;
            }        
           
        
            target_product.reviews = AllReviews;


            let sum=0;


            AllReviews.forEach((rev)=>{
                sum+=rev.rating;
            })
        
        
            target_product.numberOfReviews -=1;
        
            if(target_product.numberOfReviews!==0)
            target_product.rating = sum /  target_product.numberOfReviews;
            else
            target_product.rating=0;
        
            await target_product.save()
        
            res.status(200).json({
                status:true,
                message:"Deleted the product review successfully!"
            })

        }catch(error){

            res.status(500).send({
                status:false,
                message:`Unable to delete the product review due to ${error.errMsg} `
            })
        }
    
       
       
    
    })


}