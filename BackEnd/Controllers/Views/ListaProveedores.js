const express = require('express');
const Api = express.Router();
const Proveedores = require('../../Services/Views/ListaProveedores');

Api.get('/', (req, res) => {
    Proveedores.ViewProveedores((error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);