const Sql = require('../../Config/Sql');

const Ventas = {
    GraficaVentas: (callback) => {
        Sql.query(`
            SELECT  
                \`Fecha de la venta\`,
                COUNT(*) AS "Total de ventas"
            FROM VW_GANANCIAS
            GROUP BY \`Fecha de la venta\`
            ORDER BY \`Fecha de la venta\`
        `, callback);
    }
};

module.exports = Ventas;
