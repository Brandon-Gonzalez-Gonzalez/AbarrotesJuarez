const Sql = require('../../Config/Sql');

const Articulo = {
    // 1. Crear Artículo
    CrearArticulo: (codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio, callback) => {
        const query = 'CALL SP_ARTICULO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        Sql.query(query, [codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio], callback);
    },

    // 2. Obtener Lista
    ObtenerLista: (callback) => {
        const query = 'SELECT codigo, nombre FROM ARTICULO ORDER BY nombre ASC';
        Sql.query(query, [], callback);
    },

    // 3. Actualizar Artículo (ESTA ES LA QUE TE FALTA)
    ActualizarArticulo: (codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, unidades, precio, callback) => {
        // Asegúrate de haber creado este SP en tu base de datos con el código SQL que te pasé antes
        const query = 'CALL sp_ActualizarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        Sql.query(query, 
            [codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, unidades, precio], 
            (error, results) => {
                if (error) {
                    return callback(error, null);
                }
                return callback(null, results);
            }
        );
    }
}; 

module.exports = Articulo;