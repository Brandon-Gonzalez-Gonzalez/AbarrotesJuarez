const express = require('express');
const Api = express.Router();
const Articulo = require('../../Services/Procedures/Articulo'); 

// 1. RUTA UNIFICADA (LISTA GENERAL + BUSCADOR)
// Esta ruta maneja TANTO '/api/listaArticulo' COMO '/api/articulos/buscar'
Api.get('/', (req, res) => {
    const { criterio } = req.query; // Extraemos ?criterio=... de la URL

    // CASO A: SI HAY CRITERIO -> EJECUTAMOS BÚSQUEDA
    if (criterio) {
        // Asegúrate de que 'BuscarArticulo' exista en tu archivo de Servicios
        Articulo.BuscarArticulo(criterio, (error, resultados) => {
            if (error) {
                console.error("Error en búsqueda:", error);
                return res.status(500).send(error.sqlMessage || "Error SQL");
            }
            // Retornamos el array (vacío o con datos)
            res.json(resultados); 
        });

    // CASO B: NO HAY CRITERIO -> LISTA GENERAL
    } else {
        Articulo.ObtenerLista((error, filas) => {
            if (error) {
                console.error("Error en lista:", error);
                return res.status(500).send(error.sqlMessage || "Error SQL");
            }
            res.json(filas);
        });
    }
});

// 2. Ruta para CREAR (Se mantiene igual)
Api.post('/', (req, res) => {
    const { codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio } = req.body;
    Articulo.CrearArticulo(codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio, (error, resultado) => {
        if (error) return res.status(500).send(error.sqlMessage);
        res.json(resultado);
    });
});

// 3. Ruta para ACTUALIZAR (Se mantiene igual)
Api.put('/', (req, res) => {
    const codigoArticulo = req.body.Upc || req.body.codigo;
    if (!codigoArticulo) return res.status(400).send("Falta código");

    const lTx = (v) => (v && v !== "") ? v : null;
    const lNu = (v) => (v && v !== "") ? parseFloat(v) : 0;
    
    Articulo.ActualizarArticulo(
        codigoArticulo,
        lTx(req.body.Nombre || req.body.nombre),
        lTx(req.body.Descripcion || req.body.descripcion),
        lNu(req.body.Peso || req.body.peso),
        lTx(req.body.Categoria || req.body.categoria),
        lTx(req.body.Proveedor || req.body.proveedor),
        lTx(req.body.FechaCaducidad || req.body.fechaCaducidad),
        lNu(req.body.Unidades || req.body.unidades),
        lNu(req.body.Precio || req.body.precio),
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).send(error.sqlMessage);
            }
            res.json(resultado);
        }
    );
});

module.exports = Api;