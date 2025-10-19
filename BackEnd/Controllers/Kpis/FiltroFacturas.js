const express = require('express');
const Api = express.Router();
const FiltroFacturas = require('../../Services/Kpis/FiltroFacturas');

Api.get('/:Factura', (req, res) => {
    FiltroFacturas.KpiFiltroFacturas(req.params.Factura, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);