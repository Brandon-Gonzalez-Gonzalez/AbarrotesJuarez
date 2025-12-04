const Host = require('../Config/Host');

//Controllers
const Articulo = require('../Controllers/Procedures/Articulo');
const ArticuloPorFactura = require('../Controllers/Procedures/ArticuloPorFactura');
const ArticuloPorVenta = require('../Controllers/Procedures/ArticuloPorVenta');
const Categoria = require('../Controllers/Procedures/Categoria');   
const Cliente = require('../Controllers/Procedures/Cliente');
const Factura = require('../Controllers/Procedures/Factura');
const Pago = require('../Controllers/Procedures/Pago');
const Proveedor = require('../Controllers/Procedures/Proveedor');
const Saldo = require('../Controllers/Procedures/Saldo');
const Venta = require('../Controllers/Procedures/Venta');

//Rutas
Host.use('/api/crearArticulo', Articulo);
Host.use('/api/listaArticulo', Articulo);
Host.use('/api/buscar', Articulo);
Host.use('/api/actualizarArticulo', Articulo);
Host.use('/api/crearArticuloPorFactura', ArticuloPorFactura);
Host.use('/api/crearArticuloPorVenta', ArticuloPorVenta);
Host.use('/api/crearCategoria', Categoria);
Host.use('/api/crearCliente', Cliente);
Host.use('/api/crearFactura', Factura);
Host.use('/api/crearPago', Pago);
Host.use('/api/crearProveedor', Proveedor);
Host.use('/api/crearSaldo', Saldo);
Host.use('/api/crearVenta', Venta);

module.exports = Host;
