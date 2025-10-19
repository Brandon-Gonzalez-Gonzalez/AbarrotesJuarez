const Sql = require('../../Config/Sql');

const Proveedor = {
    CrearProveedor: (nombre, callback) => {
        const query = 'CALL SP_PROVEEDOR(?)';
        Sql.query(query, [nombre], callback);
    }
};

module.exports = Proveedor;
