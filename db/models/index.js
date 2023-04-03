//Se encargara de enviar la conexion hacia los modelos

const {userSchema,User} = require('./user.model');
const {Customer,CustomerSchema} = require('./customer.model');
const {Category,CategorySchema} = require('./category.model');
const {Product,ProductSchema} = require('./product.model');
const {Order,OrderSchema} = require('./order.model');
const {OrderProduct,OrderProductSchema} = require('./order-product.model');


function setupModels(sequelize) {
  User.init(userSchema,User.config(sequelize));
  Customer.init(CustomerSchema,Customer.config(sequelize));
  Category.init(CategorySchema,Category.config(sequelize));
  Product.init(ProductSchema,Product.config(sequelize));
  Order.init(OrderSchema,Order.config(sequelize));
  OrderProduct.init(OrderProductSchema,OrderProduct.config(sequelize));


  //Luego de todos los init van las asociaciones

   User.associate(sequelize.models);
   Customer.associate(sequelize.models); //Indicamos que customer tiene un tipo de asociacion

   Category.associate(sequelize.models); //Categoria tiene una asociacion

   Product.associate(sequelize.models); //Le agregamos una asociacion a product

   Order.associate(sequelize.models);
}

module.exports = setupModels; //NO setupModels();
