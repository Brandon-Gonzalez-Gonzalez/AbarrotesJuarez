const express = require('express');
const Api = express.Router();
const Cliente = require('../../Services/Procedures/Cliente');

Api.post('/CrearCliente', async (req, res) => {
    const { nombrePila, primerApellido, segundoApellido } = req.body;
    Cliente.CrearCliente(nombrePila, primerApellido, segundoApellido, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);