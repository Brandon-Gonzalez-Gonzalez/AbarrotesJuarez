const Sql = require('../../Config/Sql')

const Proveedores = {
    ViewProveedores: (callback) => {
        Sql.query('SELECT * FROM VW_LISTA_PROVEEDORES', callback);
    }
};

module.exports = Proveedores;