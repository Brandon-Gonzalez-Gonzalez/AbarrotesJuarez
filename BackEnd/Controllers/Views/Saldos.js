const express = require('express');
const Api = express.Router();
const Saldos = require('../../Services/Views/Saldos');

Api.get('/', (req, res) => {
    Saldos.ViewSaldos((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);