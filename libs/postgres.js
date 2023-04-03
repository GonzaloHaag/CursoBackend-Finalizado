const {Client} = require('pg');


async function getConecction() {
const client = new Client ({
  host: 'localhost',
  port:5432,
  user:'lalo',
  password: 'admin123',
  database: 'my_store'
});

await client.connect();
return client;

}

module.exports = getConecction;
