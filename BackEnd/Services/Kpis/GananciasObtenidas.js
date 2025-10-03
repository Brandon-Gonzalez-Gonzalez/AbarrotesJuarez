const Sql = require('../../Config/Sql')

const GananciasObtenidas = {
    KpiGanancias: (callback) => {
        Sql.query('SELECT SUM(Ganancia) AS Ganancias, SUM(Cantidad) AS "Articulos Vendidos" FROM VW_GANANCIAS', callback);
    }
};

module.exports = GananciasObtenidas;