const express = require('express');
const Api = express.Router();
const DetalleSaldo = require('../../Services/Views/DetalleSaldo');

Api.get('/:id', (req, res) => {
    const numCliente = req.params.id;

    DetalleSaldo.ViewDetalleSaldo(numCliente, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);
