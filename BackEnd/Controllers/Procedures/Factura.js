const express = require('express');
const Api = express.Router();
const Factura = require('../../Services/Procedures/Factura');

Api.post('/CrearFactura', async (req, res) => {
    const { codigo, fechaFactura, proveedor } = req.body;
    Factura.CrearFactura(codigo, fechaFactura, proveedor, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);