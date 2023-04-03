'use strict';

const {USER_TABLE} = require('./../models/user.model');
const {DataTypes,Sequelize} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface)  {

    //Creacion de tabla llamada users  con migraciones

    await queryInterface.createTable(USER_TABLE,{

      //Esto es buena practica pq en este momento no nos estariamos basando en el userSchema
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

      createdAt: { //Fehca de creacion
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue:Sequelize.NOW
      }
    });

  },

  async down (queryInterface, Sequelize) { //Opcion para revertir cambios
    await queryInterface.dropTable(USER_TABLE);
  }
};
