
/* Responsible for communicating with other Microservices */

const axios = require('axios')

module.exports.PublishUserEvents = async(payload,user)=>{

    try{
        console.log(`Publish event from order to User`)
        
        await axios.post('http://localhost:8000/user/app-events',{
            payload,
            user
        })

    }catch(error){
        console.log(`Unable to Publish to User Microservice due to ${error}`)
    }
}


module.exports.PublishProductEvents = async(payload)=>{

    try{
        console.log(`Publish event from order to product`)
        
        const {data} = await axios.post('http://localhost:8000/product/app-events',{
            payload
        })

        // console.log(payload.data.orderItem , data)
        return data

    }catch(error){
        console.log({errMsg:`Unable to Publish to product Microservice due to ${error}`})
    }
}


