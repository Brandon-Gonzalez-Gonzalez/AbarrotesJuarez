const Sql = require('../../Config/Sql');

const Ganancias = {
    GraficaGanancias: (callback) => {
        Sql.query(`
            SELECT  
                G.\`Fecha de la venta\`,
                G.\`Ganancia obtenida\`,
                S.\`Ganancia retenida\`
            FROM (SELECT 
                    \`Fecha de la venta\`, 
                    SUM(Ganancia) AS \`Ganancia obtenida\`
                  FROM VW_GANANCIAS
                  GROUP BY \`Fecha de la venta\`) AS G
            INNER JOIN (SELECT 
                          \`Fecha de registro\`, 
                            SUM(Deuda) AS \`Ganancia retenida\`
                        FROM VW_SALDOS
                        GROUP BY \`Fecha de registro\`) AS S
            ON G.\`Fecha de la venta\` = S.\`Fecha de registro\`
        `, callback);
    }
};

module.exports = Ganancias;
