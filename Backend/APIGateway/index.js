const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy');

/* express-http-proxy is used in order to channelise the requests to their calling service at different ports */

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user',proxy('http://localhost:8001'))
app.use('/product',proxy('http://localhost:8002'))
app.use('/order',proxy('http://localhost:8003'))
app.use('/cart',proxy('http://localhost:8004'))

app.listen(8000,()=>{
    console.log('API Gateway is running live at Port No: 8000');
})