const express = require('express');
const Api = express.Router();
const AñadirArticulo = require('../../Services/Procedures/AñadirArticulo');

Api.post('/', async (req, res) => {
    try {
        const resultado = await AñadirArticulo.AñadirArticulo(req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = Api;
