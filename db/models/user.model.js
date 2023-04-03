const {Model,DataTypes,Sequelize} = require('sequelize');

//Creacion de la estructura de la tabla users

const USER_TABLE = 'users'; //Nombre de la tabla

const userSchema = { //Esquema de la base de datos

  id: {
    allowNull:false,
    autoIncrement:true, //Autoincrementable, 1..2...3
    primaryKey:true,
    type: DataTypes.INTEGER //Tipo entero
  },
  email: {
    allowNull:false, //No puede ser nulo
    type:DataTypes.STRING,
    unique:true
  },
  password: {
    allowNull:false,
    type:DataTypes.STRING
  },
  role: {

    allowNull:false,
    type:DataTypes.STRING,
    defaultValue: 'customers', //Valor por defecto


  },
  createdAt: { //Fehca de creacion
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue:Sequelize.NOW
  }

}

class User extends Model { // Este modelo contiene todos los metodos

 static associate(models) {
  this.hasOne(models.Customer,{
    as:'customer',
    foreignKey:'userId'
  })

 }
 static config(sequelize) {
  return {
    sequelize,
    tableName: USER_TABLE,
    modelName: 'User',
    timestamps: false //Para que no cree cosas automaticamente
  }
 }



}
module.exports = {USER_TABLE,userSchema,User};
