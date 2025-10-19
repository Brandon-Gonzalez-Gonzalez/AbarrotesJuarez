const Sql = require('../../Config/Sql');

const Cliente = {
    CrearCliente: (nombrePila, primerApellido, segundoApellido, callback) => {
        const query = 'CALL SP_CLIENTE(?, ?, ?)';
        Sql.query(query, [nombrePila, primerApellido, segundoApellido], callback);
    }
};

module.exports = Cliente;