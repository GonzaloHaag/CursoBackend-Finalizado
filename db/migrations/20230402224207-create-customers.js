'use strict';

const {CUSTOMER_TABLE} = require('./../models/customer.model');
const {USER_TABLE} = require('./../models/user.model');
const { DataTypes,Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface)  {

    //Creacion de tabla llamada users  con migraciones

    await queryInterface.createTable(CUSTOMER_TABLE,{
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
      //en este momento no quiero que sea unico
        references: {
          model: USER_TABLE, //Va a estar relacionado a esta tabla de usuarios

          key: 'id'
        },
        onUpdate: 'CASCADE', //Comportamiento en cascada si hay actualizacion
        onDelete: 'SET NULL'

      }
    });

  },

  async down (queryInterface, Sequelize) { //Opcion para revertir cambios
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
