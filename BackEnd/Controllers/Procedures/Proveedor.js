const express = require('express');
const Api = express.Router();
const Proveedor = require('../../Services/Procedures/Proveedor');

Api.post('/CrearProveedor', async (req, res) => {
    const { nombre } = req.body;
    Proveedor.CrearProveedor(nombre, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);
