'use strict';

const {USER_TABLE} = require('./../models/user.model');
const {DataTypes} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //Quiero agregar una columna en la tabla de user y que campo quiero agregar(que esta en user.schema.js)
    //Tambien esta e
    await queryInterface.addColumn(USER_TABLE,'role',{

      //Le paso la estructura del role
      allowNull:false,
      type:DataTypes.STRING,
      defaultValue: 'customers', //Valor por defecto


    }); //Tambien le paso cual debe ser el esquema de ese rol
  },

  async down (queryInterface, Sequelize) { //Si quiero revertir cambios
    await queryInterface.removeColumn(USER_TABLE,'role');
  }
};
