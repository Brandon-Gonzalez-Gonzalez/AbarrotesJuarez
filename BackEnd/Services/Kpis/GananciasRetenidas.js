const Sql = require('../../Config/Sql')

const GananciasRetenidas = {
    KpiGanancias: (callback) => {
        Sql.query('SELECT SUM(S.total) AS "Ganancias retenidas", COUNT(C.num) AS "Total de clientes con saldo" FROM SALDO AS S INNER JOIN CLIENTE AS C ON S.cliente = C.num', callback);
    }
};

module.exports = GananciasRetenidas;