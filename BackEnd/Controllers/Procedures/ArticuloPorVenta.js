const express = require('express');
const Api = express.Router();
const ArticuloPorVenta = require('../../Services/Procedures/ArticuloPorVenta');

Api.post('/', (req, res) => {
    const { venta, articulo, cantidad, importe } = req.body;
    ArticuloPorVenta.CrearArticuloPorVenta(venta, articulo, cantidad, importe, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);
