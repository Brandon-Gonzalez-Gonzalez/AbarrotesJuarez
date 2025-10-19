const Sql = require('../../Config/Sql');

const Articulo = {
    CrearArticulo: (codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio, callback) => {
        const query = 'CALL SP_ARTICULO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        Sql.query(query, [codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio], callback);
    }
};

module.exports = Articulo;
