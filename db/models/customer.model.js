
const {Model,DataTypes,Sequelize} = require('sequelize');
const {USER_TABLE} = require('./user.model')

//Crearemos la tabla de customers(clientes)

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull:false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue:Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull:false, //Necesitamos q todos los clientes tengan un usuario
    type: DataTypes.INTEGER,
    unique:true, //Para que sea un campo unico-> Debemos correr otra migracion pq modificamos un campo de la tabla
    references: {
      model: USER_TABLE, //Va a estar relacionado a esta tabla de usuarios

      key: 'id'
    },
    onUpdate: 'CASCADE', //Comportamiento en cascada si hay actualizacion
    onDelete: 'SET NULL'

  }

}
class Customer extends Model {
  static associate(models) {

     /*
     Aqui crearemos la asociacion, indicamos que un cliente tiene
     una relacion con el usuario
       Aca le decimos hacia quien esta la relacion, y definimos un alias para esa asociacion
     */
    this.belongsTo(models.User,{as:'user'}); //el alias es una forma de llamar a este modelo

    //Ahora un cliente puede tener muchas ordenes de compra: hasMany()
    this.hasMany(models.Order,{
      as:'orders',
      foreignKey:'customerId'

    });
  }
  static config(sequelize) {
    return{
      sequelize,
      tableName:CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = {Customer,CustomerSchema,CUSTOMER_TABLE};
