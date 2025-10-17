const express = require('express');
const Api = express.Router();
const RegistroDeVenta = require('../../Services/Procedures/RegistroDeVenta');

Api.post('/', async (req, res) => {
    try {
        const resultado = await RegistroDeVenta.RegistroDeVenta(req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = Api;
