const Host = require('../Config/Host');

//Controllers
const Ganancias = require('../Controllers/Views/Ganancias');
const Inventario = require('../Controllers/Views/Inventario');
const Saldos = require('../Controllers/Views/Saldos');
const DetalleSaldo = require('../Controllers/Views/DetalleSaldo');
const Facturas = require('../Controllers/Views/Facturas');

//Rutas
Host.use('/api/ganancias', Ganancias);
Host.use('/api/inventario', Inventario);
Host.use('/api/saldos', Saldos);
Host.use('/api/detalleSaldo', DetalleSaldo);
Host.use('/api/facturas', Facturas);

module.exports = Host;