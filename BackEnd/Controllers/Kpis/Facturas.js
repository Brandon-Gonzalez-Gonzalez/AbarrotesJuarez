const express = require('express');
const Api = express.Router();
const Facturas = require('../../Services/Kpis/Facturas');

Api.get('/', (req, res) => {
    Facturas.KpiFacturas((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);