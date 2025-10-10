--actualizar todos los sp
--Procedimiento almacenado para ventas
DELIMITER $$
CREATE PROCEDURE RegistroDeVenta(
    IN p_fechaVenta DATE,
    IN p_total DECIMAL(10,2),
    IN p_recibido DECIMAL(10,2),
    IN p_cambio DECIMAL(10,2),
    IN p_metodoPago VARCHAR(5),
    IN p_tipoPago VARCHAR(5),
    in p_saldo INT
)
BEGIN
    INSERT INTO VENTA(fechaVenta, total, recibido, cambio, metodoPago, tipoPago, saldo)
    VALUES(p_fechaVenta, p_total, p_recibido, p_cambio, p_metodoPago, p_tipoPago, p_saldo);
END $$

--Procedimiento almacenado para articulos
DELIMITER $$

CREATE PROCEDURE AñadirArticulo(
    IN p_codigo VARCHAR(64),
    IN p_nombre VARCHAR(64),
    IN p_descripcion VARCHAR(128),
    IN p_peso DECIMAL(10,2),
    IN p_categoria INT,
    IN p_proveedor INT,
    IN p_fechaCaducidad DATE,
    IN p_ultimaModificacion DATE,
    IN p_unidades INT,
    IN p_precio DECIMAL(10,2)
)
BEGIN
    INSERT INTO ARTICULO(codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio)
    VALUES(p_codigo, p_nombre, p_descripcion, p_peso, p_categoria, p_proveedor, p_fechaCaducidad, p_ultimaModificacion, p_unidades, p_precio);
END $$
DELIMITER ;



--Procedimiento almacenado para saldos
DELIMITER $$

CREATE PROCEDURE AgregarSaldo(
    IN p_fechaRegistro DATE,
    IN p_total DECIMAL(10,2),
    IN p_cliente INT
)
BEGIN
    INSERT INTO SALDO(fechaRegistro, total, cliente)
    VALUES(p_fechaRegistro, p_total, p_cliente);
END $$
DELIMITER ;

--Procedimiento almacenado para clientes
DELIMITER $$
CREATE PROCEDURE AgregarCliente(
    IN p_nombrePila VARCHAR(64),
    IN p_primerApellido VARCHAR(64),
    IN p_segApellido VARCHAR(64)
)
BEGIN
    INSERT INTO CLIENTE(nombrePila, primerApellido, segApellido)
    VALUES(p_nombrePila, p_primerApellido, p_segApellido);
END $$
DELIMITER ;

--Procedimiento almacenado para pagos
DELIMITER $$
CREATE PROCEDURE AgregarPago(
    IN p_montoPago DECIMAL(10,2),
    IN p_numPago INT,
    IN p_fechaPago DATE,
    IN p_saldo INT
)
BEGIN
    INSERT INTO PAGO(montoPago, numPago, fechaPago, saldo)
    VALUES(p_montoPago, p_numPago, p_fechaPago, p_saldo);
END $$
DELIMITER ;


--Procedimiento almacenado para articulos por ventas
DELIMITER $$
CREATE PROCEDURE ArticulosPorVenta(
    IN p_venta INT,
    IN p_articulo VARCHAR(64),
    IN p_cantidad INT,
    IN p_importe DECIMAL(10,2)
)
BEGIN
    INSERT INTO ARTICULO_POR_VENTA(venta, articulo, cantidad, importe)
    VALUES(p_venta, p_articulo, p_cantidad, p_importe);
END $$
DELIMITER ;



