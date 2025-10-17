const Sql = require('../../Config/Sql');

const ArticulosPorVenta = {
    ArticulosPorVenta: async (articulo_venta) => {
        const { venta, articulo, cantidad, total } = articulo_venta;
        
        const query = `CALL ArticulosPorVenta(?, ?, ?, ?, ?, ?)`;
        const params = [venta, articulo, cantidad, total];

        try {
            const [rows] = await Sql.promise().query(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ArticulosPorVenta;
