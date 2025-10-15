const Sql = require('../../Config/Sql')

const DetalleSaldo = {
    ViewDetalleSaldo: (numCliente, callback) => {
        Sql.query('SELECT * FROM VW_DETALLE_SALDO WHERE Cliente = ?', [numCliente], callback);
    }
};

module.exports = DetalleSaldo;
