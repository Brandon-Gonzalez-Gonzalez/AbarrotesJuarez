const express = require('express');
const Api = express.Router();
const ArticuloPorFactura = require('../../Services/Procedures/ArticuloPorFactura');

Api.post('/', (req, res) => {
    const { factura, articulo, cantidad, costoUnitario, costoTotal, costoVenta, porcentajeVenta } = req.body;
    ArticuloPorFactura.CrearArticuloPorFactura(factura, articulo, cantidad, costoUnitario, costoTotal, costoVenta, porcentajeVenta, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);