const Sql = require('../../Config/Sql');

const Factura = {
    CrearFactura: (codigo, fechaFactura, proveedor, callback) => {
        const query = 'CALL SP_FACTURA(?, ?, ?)';
        Sql.query(query, [codigo, fechaFactura, proveedor], callback);
    }
};

module.exports = Factura;
