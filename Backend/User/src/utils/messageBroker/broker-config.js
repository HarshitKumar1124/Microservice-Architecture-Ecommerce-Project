
const credential = {

    user:'aafqzbyt',
    password:'wrATtUKyMv20WMjz6rPzgr4CgIWt52hj',
    cluster:"lionfish.rmq.cloudamqp.com"

}

const config = {

    rabbitMQ:{

        url:`amqps://${credential.user}:${credential.password}@${credential.cluster}/${credential.user}`,
        exchangeName:"USER_EXCHANGE"
    }
}

module.exports = {config}

