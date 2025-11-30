/*PROCEDIMIENTOS ALMACENADOS DE INSERCION DE DATOS*/

-- Sp Categoria listo en el back
DELIMITER $$
CREATE PROCEDURE SP_CATEGORIA(
    IN Descripcion VARCHAR(32)
)
BEGIN
    INSERT INTO CATEGORIA(descripcion) VALUES(Descripcion);
END $$
DELIMITER ;

-- SP Proveedor listo en el back
DELIMITER $$
CREATE PROCEDURE SP_PROVEEDOR(
    IN Nombre VARCHAR(32)
)
BEGIN
    INSERT INTO PROVEEDOR(nombre) VALUES(Nombre);
END $$
DELIMITER ;

-- Sp AgregarCliente listo en el back 
DELIMITER $$

CREATE PROCEDURE SP_CLIENTE(
    IN NombrePila VARCHAR(32),
    IN PrimerApellido VARCHAR(32),
    IN SegundoApellido VARCHAR(32)
)
BEGIN
    INSERT INTO CLIENTE(nombrePila, primerApellido, segApellido)
    VALUES(NombrePila, PrimerApellido, SegundoApellido);
END $$
DELIMITER ;

-- Sp AgregarSaldo listo en el back
DELIMITER $$

CREATE PROCEDURE SP_SALDO(
    IN Total INT,
    IN FechaRegistro DATE,
    IN Cliente INT
)
BEGIN
    INSERT INTO SALDO(total, fechaRegistro, cliente)
    VALUES(Total, FechaRegistro, Cliente);
END $$
DELIMITER ;

-- Sp AgregarPago listo en el back
DELIMITER $$ 

CREATE PROCEDURE SP_PAGO(
    IN MontoPago DECIMAL(10,2),
    IN NumPago INT,
    IN FechaPago DATE,
    IN Saldo INT
)
BEGIN
    INSERT INTO PAGO(montoPago, numPago, fechaPago, saldo)
    VALUES(MontoPago, NumPago, FechaPago, Saldo);
END $$
DELIMITER ;

-- Sp RegistroDeVenta listo en el back
DELIMITER $$

CREATE PROCEDURE SP_VENTA(
    IN Total DECIMAL(10,2),
    IN MetodoPago VARCHAR(5),
    IN TipoPago VARCHAR(5),
    IN Recibido DECIMAL(10,2),
    IN Cambio DECIMAL(10,2),
    IN Saldo INT,
    IN FechaVenta DATE
)
BEGIN
    INSERT INTO VENTA(total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta)
    VALUES(Total, MetodoPago, TipoPago, Recibido, Cambio, Saldo, FechaVenta);
END $$
DELIMITER ;

-- Sp AñadirArticulo listo en el back
DELIMITER $$

CREATE PROCEDURE SP_ARTICULO(
    Codigo VARCHAR(64),
    Nombre VARCHAR(24),
    Descripcion VARCHAR(24),
    Peso DECIMAL(10,2),
    Categoria INT,
    Proveedor INT,
    FechaCaducidad DATE,
    UltimaModificacion DATE,
    Unidades INT,
    Precio DECIMAL(10,2)
)
BEGIN
    INSERT INTO ARTICULO(codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio)
    VALUES(Codigo, Nombre, Descripcion, Peso, Categoria, Proveedor, FechaCaducidad, UltimaModificacion, Unidades, Precio);
END $$
DELIMITER ;

-- Sp AgregarFactura listo en el back
DELIMITER $$

CREATE PROCEDURE SP_FACTURA(
    IN Codigo VARCHAR(64),
    IN FechaFactura DATE,
    IN Proveedor INT
)
BEGIN
    INSERT INTO FACTURA(codigo, fechaFactura, proveedor)
    VALUES(Codigo, FechaFactura, Proveedor);
END $$
DELIMITER ;

-- Sp ArticulosPorVenta listo en el back
DELIMITER $$

CREATE PROCEDURE SP_ARTICULOS_POR_VENTA(
    IN Venta INT,
    IN Articulo VARCHAR(64),
    IN Cantidad INT,
    IN Importe DECIMAL(10,2)
)
BEGIN
    INSERT INTO ARTICULO_POR_VENTA(venta, articulo, cantidad, importe)
    VALUES(Venta, Articulo, Cantidad, Importe);
END $$
DELIMITER ;

-- Sp ArticulosPorFactura
DELIMITER $$

CREATE PROCEDURE SP_ARTICULOS_POR_FACTURA(
    IN Factura VARCHAR(64),
    IN Articulo VARCHAR(64),
    IN Cantidad INT,
    IN CostoUnitario DECIMAL(10,2),
    IN CostoTotal DECIMAL(10,2),
    IN CostoVenta DECIMAL(5,2),
    IN PorcentajeVenta DECIMAL(10,2)
)
BEGIN
    INSERT INTO ARTICULO_POR_FACTURA(factura, articulo, cantidad, costoUnitario, costoTotal, costoVenta, porcentajeVenta)
    VALUES(Pedido, Articulo, Cantidad, CostoUnitario, CostoTotal, CostoVenta, PorcentajeVenta);
END $$
DELIMITER ;

/*PROCEDIMIENTOS ALMACENADOS DE ACTUALIZACION DE DATOS*/


DELIMITER $$

CREATE PROCEDURE SP_ACTUALIZAR_PRECIO_ARTICULO(
    IN Codigo VARCHAR(64),       
    IN Nuevo_Precio DECIMAL(10,2)  
)
BEGIN

    UPDATE ARTICULO
    SET precio = Nuevo_Precio
    WHERE codigo = Codigo;
END$$

DELIMITER ;

CALL SP_ACTUALIZAR_PRECIO_ARTICULO('7501000138944', 60);
