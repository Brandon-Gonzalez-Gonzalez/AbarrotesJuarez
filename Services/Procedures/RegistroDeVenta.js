const Sql = require('../../Config/Sql');

const RegistroDeVenta = {
    RegistroDeVenta: async (venta) => {
        const { fechaVenta, total, recibido, cambio, metodoPago, tipoPago } = venta;
        
        const query = `CALL RegistroDeVenta(?, ?, ?, ?, ?, ?)`;
        const params = [fechaVenta, total, recibido, cambio, metodoPago, tipoPago];

        try {
            const [rows] = await Sql.promise().query(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = RegistroDeVenta;
