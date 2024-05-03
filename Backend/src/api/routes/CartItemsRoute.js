const express = require('express')

const router = express.Router();

const {AddCartItem} = require("../controller/CartController.js")


const {IsUserAuthenticated,AuthoriseRole} = require("../middleware/IsUserAuthenticated")



//Add Item in Cart DataBase  --Logged In
router.route("/AddCartItem").post(IsUserAuthenticated, AddCartItem)