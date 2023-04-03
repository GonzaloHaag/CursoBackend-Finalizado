//Archivos de conexion(usuario,password)

const {Sequelize} = require('sequelize');

const {config} = require('./../config/config');
const USER = encodeURIComponent(config.dbUser); //para proteger el ususario que viene de config
const PASSWORD = encodeURIComponent(config.dbPassword);

//Ahora crearemos la url, generalmente me la dan
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url:URI,
    dialect: 'postgres',
  },
  production: {
    url:URI,
    dialect: 'postgres'
  }

}
