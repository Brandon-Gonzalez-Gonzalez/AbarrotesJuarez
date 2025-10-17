const Host = require('../Config/Host');

//Controllers
const GananciasObtenidas = require('../Controllers/Kpis/GananciasObtenidas');
const GananciasRetenidas = require('../Controllers/Kpis/GananciasRetenidas');

//Rutas
Host.use('/api/gananciasObtenidas', GananciasObtenidas);
Host.use('/api/gananciasRetenidas', GananciasRetenidas);

module.exports = Host;