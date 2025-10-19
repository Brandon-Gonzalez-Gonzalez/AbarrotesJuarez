const Sql = require('../../Config/Sql');

const Facturas = {
    KpiFacturas: (callback) => {
        Sql.query('SELECT SUM(costoTotal) AS "Costo total", SUM((costoVenta - costoUnitario) * cantidad) AS "Ganancias" FROM ARTICULO_POR_FACTURA', callback);
    }
};

module.exports = Facturas;
