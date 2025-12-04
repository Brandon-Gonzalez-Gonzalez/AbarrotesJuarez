const Sql = require('../../Config/Sql');

const Articulo = {
    // 1. Crear Artículo
    CrearArticulo: (codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio, callback) => {
        const query = 'CALL SP_ARTICULO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        Sql.query(query, [codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio], callback);
    },

    // 2. Obtener Lista (CORREGIDO: Traer TODO para que el POS tenga precios)
    ObtenerLista: (callback) => {
        // Cambiamos 'codigo, nombre' por '*' o agregamos precio y descripcion
        const query = 'SELECT * FROM ARTICULO ORDER BY nombre ASC';
        Sql.query(query, [], callback);
    },

    // 3. Actualizar Artículo
    ActualizarArticulo: (codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, unidades, precio, callback) => {
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
    },

    // 4. Buscar Artículo (MEJORADO: Busca también en descripción)
    BuscarArticulo: (criterio, callback) => {
        // Ahora busca en Código, Nombre O Descripción
        const query = 'SELECT * FROM ARTICULO WHERE codigo = ? OR nombre LIKE ? OR descripcion LIKE ? LIMIT 5';
        const busqueda = `${criterio}%`; 
        
        // Pasamos 'busqueda' dos veces (una para nombre, otra para descripcion)
        Sql.query(query, [criterio, busqueda, busqueda], callback);
    }
}; 

module.exports = Articulo;