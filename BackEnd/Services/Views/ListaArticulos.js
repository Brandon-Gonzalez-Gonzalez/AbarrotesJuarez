const Sql = require('../../Config/Sql')

const Articulos = {
    ViewArticulos: (callback) => {
        Sql.query('SELECT * FROM VW_LISTA_ARTICULOS', callback);
    }
};

module.exports = Articulos;