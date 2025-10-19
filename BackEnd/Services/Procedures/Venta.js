const Sql = require('../../Config/Sql');

const Venta = {
    CrearVenta: (total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta, callback) => {
        const query = 'CALL SP_VENTA(?, ?, ?, ?, ?, ?, ?)';
        Sql.query(query, [total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta], callback);
    }
};

module.exports = Venta;
