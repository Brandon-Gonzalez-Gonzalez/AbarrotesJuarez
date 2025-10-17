const Sql = require('../../Config/Sql')

const Ganancias = {
    ViewGanancias: (callback) => {
        Sql.query('SELECT * FROM VW_GANANCIAS', callback);
    }
};

module.exports = Ganancias;