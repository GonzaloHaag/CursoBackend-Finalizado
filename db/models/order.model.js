//Una orden estara relacionada a un cliente, pero un cliente tiene muchas ordenes

const {Model,DataTypes,Sequelize} = require('sequelize');
const {CUSTOMER_TABLE} = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
  },
  customerId : { //relacion hacia el cliente (un cliente puede tener muchas ordenes)
    field: 'customer_id',
    allowNull:false,
    type:DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key:'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'



  },


  createdAt: {

    allowNull:false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue:Sequelize.NOW, //Valor por defecto

  },
  //PARA CALCULAR EL PRECIO TOTAL DEL CARRITO:
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if(this.items.length > 0) { //Si hay algo

      return this.items.reduce((total,item) => {

        //Multiplica el precio por la cantidad de productos
        return total + (item.price * item.OrderProduct.amount);
      },0);
      }
      return 0; //Si no hay nada el precio es 0
    }
  }
}

class Order extends Model {
  static associate(models) {
    //que una orden pertenezca a varios clientes: belongsTo()
    this.belongsTo(models.Customer,{
      as:'customer'
    });

    /*
    La orden tiene varios items de compra, se van a resolver a traves
    de orderProduct porque tiene una relacion hacia muchos productos
    */
    this.belongsToMany(models.Product,{
      as: 'items',
      through:models.OrderProduct, //Aca le pasamos cual va a ser la tabla ternaria
      foreignKey:'orderId',
      otherKey: 'productId'
    })

  }
  static config(sequelize) {
    return{
      sequelize,
      tableName:ORDER_TABLE,
      modelName: 'Order',
      timestamps:false
    }
  }
}

module.exports = {Order,OrderSchema,ORDER_TABLE};
