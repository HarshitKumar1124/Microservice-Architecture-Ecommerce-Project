// database related modules.

module.exports ={
    databaseConnection: require('./database'),
    UserRepository:require('./repository/user-repository'),
    ProductRepository:require('./repository/product-repository'),
    OrderRepository:require('./repository/order-repository')
}