const express = require('express');
const Api = express.Router();
const Categoria = require('../../Services/Procedures/Categoria');

Api.post('/', async (req, res) => {
    const { descripcion } = req.body;
    Categoria.CrearCategoria(descripcion, (error, resultado) => {
        if (error) return res.status(500).send(error);
        res.json(resultado);
    });
});

module.exports = (Api);