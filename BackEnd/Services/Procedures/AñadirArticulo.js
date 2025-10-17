const Sql = require('../../Config/Sql');

const AñadirArticulo = {
    AñadirArticulo: async (articulo) => {
        const { codigo, nombre, descripcion, ultimaModificacion, unidades, precio, categoria } = articulo;
        
        const query = `CALL AñadirArticulo(?, ?, ?, ?, ?, ?, ?)`;
        const params = [codigo, nombre, descripcion, ultimaModificacion, unidades, precio, categoria];

        try {
            const [rows] = await Sql.promise().query(query, params);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = AñadirArticulo;
