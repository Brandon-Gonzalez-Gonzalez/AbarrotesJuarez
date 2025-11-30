const express = require('express');
const Api = express.Router();
const Venta = require('../../Services/Procedures/Venta');

Api.post('/', (req, res) => {
    const { total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta } = req.body;
    Venta.CrearVenta(total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);