const express = require('express');
const Api = express.Router();
const Inventario = require('../../Services/Views/Inventario');

Api.get('/', (req, res) => {
    Inventario.ViewInventario((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);