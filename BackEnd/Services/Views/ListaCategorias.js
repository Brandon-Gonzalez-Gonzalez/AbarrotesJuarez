const Sql = require('../../Config/Sql')

const Categorias = {
    ViewCategorias: (callback) => {
        Sql.query('SELECT * FROM VW_LISTA_CATEGORIAS', callback);
    }
};

module.exports = Categorias;
