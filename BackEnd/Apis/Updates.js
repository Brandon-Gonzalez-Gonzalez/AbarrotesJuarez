const Host = require('../Config/Host');

//Controllers
const ActualizarPrecio = require('../Controllers/Updates/PrecioArticulo');

//Rutas
Host.use('/api/actualizarPrecio', ActualizarPrecio);


module.exports = Host;
