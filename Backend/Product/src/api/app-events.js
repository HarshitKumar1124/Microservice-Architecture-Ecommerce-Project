/*These app-events are being created in order to make services communicate to each other over network calls */

const ProductService = require('../services/product-service')

module.exports = (app)=>{

    const product_service = new ProductService()


    app.use('/app-events',async (req,res)=>{

       try{
        const {payload} = req.body;

        console.log('============ Other Service Received Events =================')

        const response = await product_service.subscribeEvents(payload);

        // console.log('ye aaya reponse',response)
        return res.status(200).json(response)

       
       }catch(error){

        res.send({
            status:false,
            message: `Failed Event due to ${error}`
        })
        
       }

    })
}