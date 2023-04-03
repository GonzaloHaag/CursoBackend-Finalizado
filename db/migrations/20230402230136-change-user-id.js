'use strict';

const { CUSTOMER_TABLE} = require('../models/customer.model');
const {DataTypes} = require('sequelize');
//Pusimos un nuevo campo en la tabla userId,POR LO TANTO HAY QUE CREAR ESTA MIGRACION

//Modificacion de una columna existente

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //Para modificar una columna -> Le debemos decir que columna modificar y que tabla
   await queryInterface.changeColumn(CUSTOMER_TABLE,'user_id',{
    field: 'user_id',
    allowNul:false, //Necesitamos q todos los clientes tengan un usuario
    type: DataTypes.INTEGER,
    unique:true,  //aca se ponen los cambios a modificar, quiero que sea unico ahora
   });
  },

  async down (queryInterface, Sequelize) {
    //await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
