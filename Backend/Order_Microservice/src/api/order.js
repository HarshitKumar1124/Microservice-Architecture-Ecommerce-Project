const { AuthUser } = require("./middleware");
const { IsUserAuthenticated, AuthoriseRole } = AuthUser;
const OrderService = require('../services/order-service')

module.exports = (app) => {

    const order_service = new OrderService();


  //* Create New Order --Logged In */
  app.post("/order/new", IsUserAuthenticated, async (req, res, next) => {
    try {

      console.log("Order Creation Initiated!");

      const body = req.body;
      const {orderItem} = body;

      let itemsPrice=0;
      let shippingPrice=20; /* default for now */ 


      if(orderItem.length===0){

        res.status(401).send({
            status:false,
            message:'No Items to order!'
        })

        return;

      }

      orderItem.forEach(async(item) => {
        itemsPrice+=item.quantity * item.price
        
      });

      const order = await order_service.createOrder({
        ...body,
        itemsPrice,
        shippingPrice,
        totalPrice:shippingPrice + itemsPrice,
        createdBy:req.user._id
      });

      res.status(200).json({
        success: true,
        order,
        message: "Confirmation | Order placed !",
      });

    } catch (error) {

      console.log('Error In Order Confirmation placement!',error)
      res.status(500).send({
          status:false,
          order:null,
          message:`Failed to placed user order due to ${error.errMsg}`
        })
      
    }
  });

  /* Get My Orders  --- Logged In */
  app.get("/user/order/Myorders", IsUserAuthenticated, async (req, res, next) => {
    try {
      const orders = await order_service.getMyOrders(req.user);

      res.status(200).json({
        success: true,
        orders,
        message: "Fetched the user's orders successfully!",
      });


      
    } catch (error) {
    
      res.status(500).send({
          status:false,
          message:`Failed to fetch my orders of user due to ${error.errmsg}`
        })
     
    }
  });

  /* Get Details of Order By OrderID --- LoggedIn Only */
  app.get("/user/order/:id",IsUserAuthenticated,async (req, res, next) => {
      try {

        const orderID = req.params.id;

        if(!orderID){

          res.status(401).send({
            status:false,
            message:"Invalid Order ID!"
          })
       
        }

        const order = await order_service.getOrder(orderID,req.user);

        res.status(200).send({
          status:true,
          order,
          message:"Order details are fetched successfully!"
        })
       
       
      } catch (error) {
       
        res.status(500).send({
            status:false,
            message:`Failed to fetch the order details due to ${error.errmsg}`
          })
    
      }
    }
  );

  

  // /* Get All User's Orders  --- Admin Only */
  // app.get("/user/admin/orders",IsUserAuthenticated,AuthoriseRole,async (req, res, next) => {
   
  //   try {
  //     console.log('heyyyyy')
  //     const orders = await order_service.getAllOrders();

  //     res.status(200).json({
  //       success: true,
  //       orders,
  //       message: "Fetched All user's orders successfully!",
  //     });


      
  //   } catch (error) {
    
  //     res.status(500).send({
  //         status:false,
  //         message:`Failed to fetch all user's orders due to ${error.errmsg}`
  //       })
     
  //   }
  //   }
  // );

  /* Delete the Order by OrderID  --- Logged In */
  app.delete("/user/order/delete/:id",IsUserAuthenticated,async (req, res, next) => {
      try {
        const orderID = req.params.id

        await order_service.deleteOrder(orderID,req.user);

        res.status(200).send({
          status:true,
          message:"Order deleted successfully!"
        })
       

      } catch (error) {
        
        res.status(500).send({
          status:false,
          message:`Failed to delete the order details due to ${error.errmsg}`
        })
        
      }
    }
  );
};
