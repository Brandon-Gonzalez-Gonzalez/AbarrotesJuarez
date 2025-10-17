const express = require('express');
const Api = express.Router();
const AgregarSaldo = require('../../Services/Procedures/AgregarSaldo');

Api.post('/', async (req, res) => {
    try {
        const resultado = await AgregarSaldo.AgregarSaldo(req.body);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = Api;
