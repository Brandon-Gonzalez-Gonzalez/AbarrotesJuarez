const express = require('express');
const Api = express.Router();
const Ventas = require('../../Services/Graficas/Ventas');

Api.get('/', (req, res) => {
    Ventas.GraficaVentas((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);