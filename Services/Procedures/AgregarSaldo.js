const Sql = require('../../Config/Sql');

const AgregarSaldo = {
    AgregarSaldo: async (saldo) => {
        const { nombre, primerApell, segApell, fechaRegistro, fechaPago, deuda, pago, total, venta } = saldo;
        
        const query = `CALL AgregarSaldo(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [nombre, primerApell, segApell, fechaRegistro, fechaPago, deuda, pago, total, venta];

        try {
            const [rows] = await Sql.promise().query(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = AgregarSaldo;
