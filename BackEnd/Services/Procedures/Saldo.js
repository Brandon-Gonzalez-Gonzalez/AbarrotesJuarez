const Sql = require('../../Config/Sql');

const Saldo = {
    CrearSaldo: (total, fechaRegistro, cliente, callback) => {
        const query = 'CALL SP_SALDO(?, ?, ?)';
        Sql.query(query, [total, fechaRegistro, cliente], callback);
    }
};

module.exports = Saldo;
