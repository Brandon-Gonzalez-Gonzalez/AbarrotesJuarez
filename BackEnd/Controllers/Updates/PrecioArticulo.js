const express = require('express');
const Api = express.Router();
const PrecioArticulo = require('../../Services/Updates/PrecioArticulo');

Api.put('/', (req, res) => {
    const { codigo, precio } = req.body;

    PrecioArticulo.ActualizarPrecio(codigo, precio, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = Api;
