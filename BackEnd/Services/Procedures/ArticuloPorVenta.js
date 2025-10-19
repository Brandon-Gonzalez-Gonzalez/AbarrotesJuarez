const Sql = require('../../Config/Sql');

const ArticuloPorVenta = {
    CrearArticuloPorVenta: (venta, articulo, cantidad, importe, callback) => {
        const query = 'CALL SP_ARTICULOS_POR_VENTA(?, ?, ?, ?)';
        Sql.query(query, [venta, articulo, cantidad, importe], callback);
    }
};

module.exports = ArticuloPorVenta;
