const { AuthUser } = require("./middleware");
const { IsUserAuthenticated, AuthoriseRole } = AuthUser;
const OrderService = require('../services/order-service')

const {PublishUserEvents,PublishProductEvents} = require('../utils/eventPublisher');
const { addListener } = require("../../../Product/src/database/models/ProductSchema");

module.exports = (app) => {

    const order_service = new OrderService();

     /* Microservice Server Check */
     app.get('/',(req,res)=>{

        res.status(200).send({
            message:"Order Microservice is working live on Port 8003"
        })

        console.log('Order Microservice is working live on Port 8003')
    })



  //* Create New Order --Logged In */
  app.post("/new", IsUserAuthenticated, async (req, res, next) => {
    try {

      console.log("Order Creation Initiated!");

      const body = req.body;
      let {orderItem} = body;

      let itemsPrice=0;
      let shippingPrice=20; /* default for now */ 


       /* Filter those products in an order which exist in database -- Eliminate the non-existing Products */
        orderItem = await PublishProductEvents({
            event:'CHECK_PRODUCT_EXIST',
            data:{
              orderItem
            }

        })

        console.log('List of Products existing for valid order placing ',orderItem)




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

      // console.log('Final Ordered Items ',orderItem)
      const newbody = {...body,orderItem:orderItem}

      // console.log('new body',newbody)

      const order = await order_service.createOrder({
        ...newbody,
        itemsPrice,
        shippingPrice,
        totalPrice:shippingPrice + itemsPrice,
        createdBy:req.user._id
      });

       /* Here we will publish the User Service to add the OrderID in userSchema */
       PublishUserEvents({
        event: "ADD_ORDER",
        data:{
          orderID: order._id
        }
      },req.user)

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
  app.get("/Myorders", IsUserAuthenticated, async (req, res, next) => {
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
  app.get("/:id",IsUserAuthenticated,async (req, res, next) => {
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

  // // /* Get All User's Orders  --- Admin Only */  this is not being called but above function is gettng called
  // app.get("/admin/orders",IsUserAuthenticated,AuthoriseRole,async (req, res, next) => {
   
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
  app.delete("/delete/:id",IsUserAuthenticated,async (req, res, next) => {

    console.log('Deleting Order Initiated!')
      try {
        const orderID = req.params.id

        await order_service.deleteOrder(orderID,req.user);

         /* Here we will publish the User Service to delete the OrderID in userSchema */
         PublishUserEvents({
          event: "REMOVE_ORDER",
          data:{
            orderID
          }
        },req.user)

        res.status(200).send({
          status:true,
          message:"Order deleted successfully!"
        })
       

      } catch (error) {
        
        res.status(500).send({
          status:false,
          message:`Failed to delete the order details due to ${error.errMsg}`,
        })
        
      }
    }
  );
};
