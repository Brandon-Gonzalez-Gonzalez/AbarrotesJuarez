const Sql = require('../../Config/Sql');

const Pago = {
    CrearPago: (montoPago, numPago, fechaPago, saldo, callback) => {
        const query = 'CALL SP_PAGO(?, ?, ?, ?)';
        Sql.query(query, [montoPago, numPago, fechaPago, saldo], callback);
    }
};

module.exports = Pago;
