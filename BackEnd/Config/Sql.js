const mysql = require('mysql2');

const Sql = mysql.createConnection({
  host: 'localhost',
  user: 'EduardoMartinez',
  password: 'AbarrotesJuarez',
  database: 'AbarrotesJuarez'
});

Sql.connect();

module.exports = Sql;
