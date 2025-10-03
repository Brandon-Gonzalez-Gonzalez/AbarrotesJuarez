const express = require('express');
const Api = express.Router();
const GananciasObtenidas = require('../../Services/Kpis/GananciasObtenidas');

Api.get('/', (req, res) => {
    GananciasObtenidas.KpiGanancias((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);