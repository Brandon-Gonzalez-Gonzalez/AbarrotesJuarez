const express = require('express');
const Api = express.Router();
const Categorias = require('../../Services/Views/ListaCategorias');

Api.get('/', (req, res) => {
    Categorias.ViewCategorias((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);