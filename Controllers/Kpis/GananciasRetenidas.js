const express = require('express');
const Api = express.Router();
const GananciasRetenidas = require('../../Services/Kpis/GananciasRetenidas');

Api.get('/', (req, res) => {
    GananciasRetenidas.KpiGanancias((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);