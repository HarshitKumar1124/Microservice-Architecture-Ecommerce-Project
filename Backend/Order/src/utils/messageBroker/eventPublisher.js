
/* Making a Publisher Class using RabbitMQ MESSAGE BROKER to communicate with other Microservices */

const amqp = require('amqplib')

/* AMQP stands for Advanced Message Queue Protocol */
/* Module is used to integrate Cloud RabbitMQ with the application */

const {config} = require('./broker-config')

class MQPublisher{

    channel;

    async establishChannel(){

        try{

            const connection = await amqp.connect(config.rabbitMQ.url)
            this.channel = await connection.createChannel();
            await this.channel.assertExchange(config.rabbitMQ.exchangeName,"direct");

        }catch(error){
            throw error
        }

    }


    async publishMessage(bindingKey,payload){

        if(!this.channel){
            await this.establishChannel();
        }

       try{
            

            await this.channel.publish(config.rabbitMQ.exchangeName,bindingKey,Buffer.from(
                JSON.stringify(payload)
            ))
            console.log('Payload Published ')

       }catch(error){
        throw error
       }

    }
}

module.exports = MQPublisher;