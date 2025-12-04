const express = require('express');
const Api = express.Router();
const Articulos = require('../../Services/Views/ListaArticulos');

Api.get('/', (req, res) => {
    Articulos.ViewArticulos((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);