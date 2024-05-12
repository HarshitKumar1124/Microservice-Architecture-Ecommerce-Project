/*These app-events are being created in order to make services communicate to each other over network calls */

const UserService = require('../services/user-service')

module.exports = (app)=>{

    const user_service = new UserService()


    app.use('/app-events',async (req,res)=>{

       try{
        const {payload} = req.body;

        console.log('============ Other Service Received Events =================')

        user_service.subscribeEvents(payload);

      
        return res.status(200).json(payload)

       
       }catch(error){

        res.send({
            status:false,
            message: `Failed Event due to ${error}`
        })
        
       }

    })
}