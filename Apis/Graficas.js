const Host = require('../Config/Host');

//Controllers
const Ganancias = require('../Controllers/Graficas/Ganancias');
const Ventas = require('../Controllers/Graficas/Ventas');

//Rutas
Host.use('/api/graficaGanancias', Ganancias);
Host.use('/api/promedioVentas', Ventas);

module.exports = Host;


