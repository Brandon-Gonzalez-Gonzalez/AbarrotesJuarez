const Sql = require('../../Config/Sql');

const ArticuloPorFactura = {
    CrearArticuloPorFactura: (factura, articulo, cantidad, costoUnitario, costoTotal, costoVenta, porcentajeVenta, callback) => {
        const query = 'CALL SP_ARTICULOS_POR_FACTURA(?, ?, ?, ?, ?, ?, ?)';
        Sql.query(query, [factura, articulo, cantidad, costoUnitario, costoTotal, costoVenta, porcentajeVenta], callback);
    }
};

module.exports = ArticuloPorFactura;
