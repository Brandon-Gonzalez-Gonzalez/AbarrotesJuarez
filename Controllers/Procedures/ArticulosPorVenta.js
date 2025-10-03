const express = require('express');
const Api = express.Router();
const ArticulosPorVenta = require('../../Services/Procedures/ArticulosPorVenta');

Api.post('/', async (req, res) => {
    try {
        const resultado = await ArticulosPorVenta.ArticulosPorVenta(req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = Api;
