const Host = require('../Config/Host');

//Controllers
const RegistroDeVenta = require('../Controllers/Procedures/RegistroDeVenta');
const ArticulosPorVenta = require('../Controllers/Procedures/ArticulosPorVenta');
const AñadirArticulo = require('../Controllers/Procedures/AñadirArticulo');
const AgregarSaldo = require('../Controllers/Procedures/AgregarSaldo');

//Rutas
Host.use('/api/registroDeVenta', RegistroDeVenta);
Host.use('/api/articulosPorVenta', ArticulosPorVenta);
Host.use('/api/añadirArticulo', AñadirArticulo);
Host.use('/api/agregarSaldo', AgregarSaldo);


module.exports = Host;
