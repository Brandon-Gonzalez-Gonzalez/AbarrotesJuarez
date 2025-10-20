const express = require('express');
const Api = express.Router();
const Saldo = require('../../Services/Procedures/Saldo');

Api.post('/CrearSaldo', (req, res) => {
    const { total, fechaRegistro, cliente } = req.body;
    Saldo.CrearSaldo(total, fechaRegistro, cliente, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);