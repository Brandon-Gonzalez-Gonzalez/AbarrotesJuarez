const Sql = require('../../Config/Sql');

const Categoria = {
    CrearCategoria: (descripcion, callback) => {
        const query = 'CALL SP_CATEGORIA(?)';
        Sql.query(query, [descripcion], callback);
    }
};

module.exports = Categoria;
