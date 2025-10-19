const Host = require('../Config/Host');

//Controllers
const GananciasObtenidas = require('../Controllers/Kpis/GananciasObtenidas');
const GananciasRetenidas = require('../Controllers/Kpis/GananciasRetenidas');
const Facturas = require('../Controllers/Kpis/Facturas');
const FiltroFacturas = require('../Controllers/Kpis/FiltroFacturas');


//Rutas
Host.use('/api/gananciasObtenidas', GananciasObtenidas);
Host.use('/api/gananciasRetenidas', GananciasRetenidas);
Host.use('/api/gananciasFacturas', Facturas);
Host.use('/api/filtroFacturas', FiltroFacturas);

module.exports = Host;