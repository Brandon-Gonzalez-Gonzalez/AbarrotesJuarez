const express = require('express');
const Api = express.Router();
const Pago = require('../../Services/Procedures/Pago');

Api.post('/', async (req, res) => {
    const { montoPago, numPago, fechaPago, saldo } = req.body;
    Pago.CrearPago(montoPago, numPago, fechaPago, saldo, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);
