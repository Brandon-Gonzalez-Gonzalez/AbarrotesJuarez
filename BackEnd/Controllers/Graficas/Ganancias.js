const express = require('express');
const Api = express.Router();
const Ganancias = require('../../Services/Graficas/Ganancias');

Api.get('/', (req, res) => {
    Ganancias.GraficaGanancias((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);