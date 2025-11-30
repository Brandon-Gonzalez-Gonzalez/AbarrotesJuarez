const Sql = require('../../Config/Sql');

const PrecioArticulo = {
    ActualizarPrecio: (codigo, precio, callback) => {
        const query = `
            UPDATE ARTICULO
            SET precio = ?, ultimaModificacion = CURRENT_TIMESTAMP
            WHERE codigo = ?
        `;

        Sql.query(query, [precio, codigo], callback);
    }
};

module.exports = PrecioArticulo;
