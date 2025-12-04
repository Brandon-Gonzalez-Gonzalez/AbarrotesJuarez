const express = require('express');
const Api = express.Router();
const Articulo = require('../../Services/Procedures/Articulo'); // Importa el archivo del PASO 1

// Rutas GET y POST (déjalas como las tenías)
Api.get('/', (req, res) => {
    Articulo.ObtenerLista((error, filas) => {
        if (error) return res.status(500).send(error);
        res.json(filas);
    });
});

Api.post('/', (req, res) => {
    // ... tu código de crear ...
    const { codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio } = req.body;
    Articulo.CrearArticulo(codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio, (error, resultado) => {
        if (error) return res.status(500).send(error.sqlMessage);
        res.json(resultado);
    });
});

// RUTA PUT (Actualizar)
Api.put('/', (req, res) => {
    const codigoArticulo = req.body.Upc || req.body.codigo;
    if (!codigoArticulo) return res.status(400).send("Falta código");

    // Limpieza básica
    const lTx = (v) => (v && v !== "") ? v : null;
    const lNu = (v) => (v && v !== "") ? parseFloat(v) : 0;
    
    // Llamada al Servicio (Aquí es donde fallaba antes)
    Articulo.ActualizarArticulo(
        codigoArticulo,
        lTx(req.body.Nombre || req.body.nombre),
        lTx(req.body.Descripcion || req.body.descripcion),
        lNu(req.body.Peso || req.body.peso),
        lTx(req.body.Categoria || req.body.categoria),
        lTx(req.body.Proveedor || req.body.proveedor),
        lTx(req.body.FechaCaducidad || req.body.fechaCaducidad), // Fecha
        lNu(req.body.Unidades || req.body.unidades),
        lNu(req.body.Precio || req.body.precio),
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error.sqlMessage);
            }
            res.json(resultado);
        }
    );
});

module.exports = Api;