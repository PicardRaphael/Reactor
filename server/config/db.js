/*
* CONNECTION TO THE DATABASE MYSQL
*/
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'reactor',
  password: 'reactor',
  database: 'reactor'
});

connection.connect();
console.log('Connexion to the BDD :', connection.config.host);

module.exports = connection;
