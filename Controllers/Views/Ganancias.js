const express = require('express');
const Api = express.Router();
const Ganancias = require('../../Services/Views/Ganancias');

Api.get('/', (req, res) => {
    Ganancias.ViewGanancias((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);