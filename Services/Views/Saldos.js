const Sql = require('../../Config/Sql')

const Saldos = {
    ViewSaldos: (callback) => {
        Sql.query('SELECT * FROM VW_SALDOS', callback);
    }
};

module.exports = Saldos;