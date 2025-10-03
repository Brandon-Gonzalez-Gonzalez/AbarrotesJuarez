const mysql = require('mysql2');

const Sql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'AbarrotesJuarez'
});

Sql.connect();

module.exports = Sql;
