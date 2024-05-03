const express = require('express');
const {IsUserAuthenticated,AuthoriseRole} = require("../middleware/IsUserAuthenticated")

const { processPayment, sendStripeAPIKey } = require('../controller/PaymentController');

const router = express.Router();

// const {IsUserAuthenticated,AuthoriseRole} = require("../middleware/IsUserAuthenticated")

router.route('/process/payment').post(IsUserAuthenticated,processPayment);

router.route('/stripeAPIkey').get(IsUserAuthenticated,sendStripeAPIKey)

module.exports = router;