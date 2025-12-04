const Host = require('../Config/Host');

//Controllers
const Ganancias = require('../Controllers/Views/Ganancias');
const Inventario = require('../Controllers/Views/Inventario');
const Saldos = require('../Controllers/Views/Saldos');
const DetalleSaldo = require('../Controllers/Views/DetalleSaldo');
const Facturas = require('../Controllers/Views/Facturas');
const ListaArticulos = require('../Controllers/Views/ListaArticulos');
const ListaProveedores = require('../Controllers/Views/ListaProveedores');
const ListaCategorias = require('../Controllers/Views/ListaCategorias');

//Rutas
Host.use('/api/ganancias', Ganancias);
Host.use('/api/inventario', Inventario);
Host.use('/api/saldos', Saldos);
Host.use('/api/detalleSaldo', DetalleSaldo);
Host.use('/api/facturas', Facturas);
Host.use('/api/listaArticulos', ListaArticulos);
Host.use('/api/listaProveedores', ListaProveedores);
Host.use('/api/listaCategorias', ListaCategorias);

module.exports = Host;