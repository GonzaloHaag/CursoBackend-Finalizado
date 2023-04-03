const {Pool} = require('pg');

const {config} = require('./../config/config');

const USER = encodeURIComponent(config.dbUser); //para proteger el ususario que viene de config
const PASSWORD = encodeURIComponent(config.dbPassword);

//Ahora crearemos la url, generalmente me la dan
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

//Luego de pasar todas estas variables,debemos definirlas en el package.json



const pool = new Pool ({
  connectionString:URI //Ahora queda mas productivo
});




module.exports = pool;
