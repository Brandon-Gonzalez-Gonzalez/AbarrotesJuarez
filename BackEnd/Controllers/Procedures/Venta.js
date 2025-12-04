const express = require('express');
const Api = express.Router();
const Venta = require('../../Services/Procedures/Venta');

Api.post('/', (req, res) => {
    // 1. IMPRIMIR QUE LLEGARON LOS DATOS
    console.log("--> INTENTO DE VENTA RECIBIDO <--");
    console.log("Datos recibidos (Body):", req.body);

    const { total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta } = req.body;

    // VALIDACIÓN RÁPIDA: Si 'total' es undefined, el JSON no está llegando bien
    if (total === undefined) {
        console.error("ERROR: El cuerpo de la petición está vacío o mal formado.");
        return res.status(400).json({ 
            message: "No se recibieron datos. Revisa que el frontend envíe JSON y Content-Type: application/json" 
        });
    }

    Venta.CrearVenta(
        total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta,
        (error, resultado) => {
            if (error) {
                // 2. IMPRIMIR EL ERROR REAL EN LA CONSOLA NEGRA
                console.error("!!! ERROR SQL EN SERVICIOS !!!");
                console.error(error); 
                
                // Responder con JSON para que el navegador no tire error de parseo
                return res.status(500).json({ 
                    message: "Error al guardar en BD", 
                    detalle: error.message || error.sqlMessage || error 
                });
            }
            
            console.log("--> VENTA GUARDADA CON ÉXITO <--");
            res.json(resultado);
        }
    );
});

module.exports = Api;