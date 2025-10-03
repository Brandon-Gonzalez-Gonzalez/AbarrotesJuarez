const Host = require('../Config/Host');

//Controllers
const Ganancias = require('../Controllers/Views/Ganancias');
const Inventario = require('../Controllers/Views/Inventario');
const Saldos = require('../Controllers/Views/Saldos');

//Rutas
Host.use('/api/ganancias', Ganancias);
Host.use('/api/inventario', Inventario);
Host.use('/api/saldos', Saldos);

module.exports = Host;