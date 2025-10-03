const Sql = require('../../Config/Sql')

const Inventario = {
    ViewInventario: (callback) => {
        Sql.query('SELECT * FROM VW_INVENTARIO', callback);
    }
};

module.exports = Inventario;