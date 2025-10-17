const Sql = require('../../Config/Sql')

const GananciasObtenidas = {
    KpiGanancias: (callback) => {
        Sql.query('SELECT SUM(V.recibido - COALESCE(V.cambio, 0)) AS "Ganancias obtenidas", SUM(AV.cantidad) AS "Total de productos vendidos"FROM VENTA AS V INNER JOIN ARTICULO_POR_VENTA AS AV ON V.num = AV.venta', callback);
    }
};

module.exports = GananciasObtenidas;
