
//ORM MUY POTENTE --> PERMITE MANEJAR LA BASE DE DATOS DESDE CODIGO

const {Sequelize} = require('sequelize');

const {config} = require('./../config/config');
const setupModels = require('./../db/models'); //ME TRAIGO LA FUNCION

const USER = encodeURIComponent(config.dbUser); //para proteger el ususario que viene de config
const PASSWORD = encodeURIComponent(config.dbPassword);

//Ahora crearemos la url, generalmente me la dan
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,{
  dialect : 'postgres', //Base de datos que voy a utilizar
  logging: true

})

setupModels(sequelize); //Le envio la conexion



module.exports = sequelize;
