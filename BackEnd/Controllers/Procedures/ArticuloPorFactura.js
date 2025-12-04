const express = require('express');
const Api = express.Router();
const ArticuloPorFactura = require('../../Services/Procedures/ArticuloPorFactura');

Api.post('/', (req, res) => {
    const { Factura, Articulo, Cantidad, CostoUnitario, CostoTotal, CostoVenta, PorcentajeVenta } = req.body;

    ArticuloPorFactura.CrearArticuloPorFactura(Factura, Articulo, Cantidad, CostoUnitario, CostoTotal, CostoVenta, PorcentajeVenta, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);