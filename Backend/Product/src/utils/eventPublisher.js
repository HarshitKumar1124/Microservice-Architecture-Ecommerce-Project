
/* Responsible for communicating with other Microservices */

const axios = require('axios')

module.exports.PublishUserEvents = async(payload)=>{

    axios.post('http://localhost:8000/user/app-events',{
        payload
    })
}

