const Sql = require('../../Config/Sql')

const GananciasRetenidas = {
    KpiGanancias: (callback) => {
        Sql.query('SELECT SUM(Deuda) AS "Ganancias retenidas", COUNT(DISTINCT `Nombre del cliente`) AS "Total de personas" FROM VW_SALDOS', callback);
    }
};

module.exports = GananciasRetenidas;