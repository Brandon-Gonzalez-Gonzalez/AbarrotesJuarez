const Sql = require('../../Config/Sql')

const Facturas = {
    ViewFacturas: (callback) => {
        Sql.query('SELECT * FROM VW_FACTURAS', callback);
    }
};

module.exports = Facturas;