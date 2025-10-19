const Sql = require('../../Config/Sql')

const FiltroFacturas = {
    KpiFiltroFacturas: (Factura, callback) => {
        Sql.query('SELECT SUM(costoTotal) AS "Costo total", SUM((costoVenta - costoUnitario) * cantidad) AS "Ganancias" FROM ARTICULO_POR_FACTURA WHERE factura = ?', [Factura], callback);
    }
};

module.exports = FiltroFacturas;
