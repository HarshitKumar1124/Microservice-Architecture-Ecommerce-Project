
/* Responsible for communicating with other Microservices */

const axios = require('axios')

module.exports.PublishProductEvents = async(payload)=>{

    try{
        console.log(`Publish event from cart to product`)
        
        return await axios.post('http://localhost:8000/product/app-events',{
            payload
        })

    }catch(error){
        console.log(`Unable to Publish to Product Microservice due to ${error}`)
        return false
    }
}

