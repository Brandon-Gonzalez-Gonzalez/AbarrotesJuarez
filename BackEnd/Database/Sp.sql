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
    IN p_nombre VARCHAR(24),
    IN p_descripcion VARCHAR(24),
    IN p_ultimaModificacion DATE,
    IN p_peso INT,
    IN p_unidades INT,
    IN p_precio DECIMAL(10,2),
    IN p_categoria INT
)
BEGIN
    INSERT INTO ARTICULO(codigo, nombre, descripcion, ultimaModificacion, unidades, precio, categoria)
    VALUES(p_codigo, p_nombre, p_descripcion, p_ultimaModificacion, p_peso, p_unidades, p_precio, p_categoria);
END $$


--Procedimiento almacenado para saldos
DELIMITER $$
CREATE PROCEDURE AgregarSaldo(
    IN p_nombre VARCHAR(24),
    IN p_primerApell VARCHAR(32),
    IN p_segApell VARCHAR(32),
    IN p_fechaRegistro DATE,
    IN p_fechaPago DATE,
    IN p_deuda DECIMAL(10,2),
    IN p_pago DECIMAL(10,2),
    IN p_total DECIMAL(10,2),
    IN p_venta INT
)
BEGIN
    INSERT INTO SALDO(nombre, primerApell, segApell, fechaRegistro, fechaPago, deuda, pago, total, venta)
    VALUES(p_nombre, p_primerApell, p_segApell, p_fechaRegistro, p_fechaPago, p_deuda, p_pago, p_total, p_venta);
END $$

--Procedimiento almacenado para articulos por ventas
DELIMITER $$
CREATE PROCEDURE ArticulosPorVenta(
    IN p_venta INT,
    IN p_articulo VARCHAR(64),
    IN p_cantidad INT,
    IN p_total DECIMAL(10,2)
)
BEGIN
    INSERT INTO ARTICULO_VENTA(venta, articulo, cantidad, total)
    VALUES(p_venta, p_articulo, p_cantidad, p_total);
END $$



