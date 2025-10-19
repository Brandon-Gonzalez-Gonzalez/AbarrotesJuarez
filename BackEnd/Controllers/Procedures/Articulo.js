const express = require('express');
const Api = express.Router();
const Articulo = require('../../Services/Procedures/Articulo');

Api.post('/crearArticulo', (req, res) => {
    const { codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio } = req.body;
    Articulo.AgregarArticulo(codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);