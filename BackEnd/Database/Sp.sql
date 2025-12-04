/*PROCEDIMIENTOS ALMACENADOS DE INSERCION DE DATOS*/

use AbarrotesJuarez

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

USE AbarrotesJuarez

drop procedure SP_ARTICULOS_POR_FACTURA

-- Sp ArticulosPorFactura

drop procedure SP_ARTICULOS_POR_FACTURA

DELIMITER $$

CREATE PROCEDURE SP_ARTICULOS_POR_FACTURA(
    IN Factura VARCHAR(64),
    IN Articulo VARCHAR(64),
    IN Cantidad INT,
    IN CostoUnitario DECIMAL(10,2),
    IN CostoTotal DECIMAL(10,2),
    IN CostoVenta DECIMAL(10,2),
    IN PorcentajeVenta DECIMAL(10,2)
)
BEGIN
    INSERT INTO ARTICULO_POR_FACTURA(factura, articulo, cantidad, costoUnitario, costoTotal, costoVenta, porcentajeVenta)
    VALUES(Factura, Articulo, Cantidad, CostoUnitario, CostoTotal, CostoVenta, PorcentajeVenta);
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
DELIMITER $$

DELIMITER $$

use AbarrotesJuarez

DROP PROCEDURE IF EXISTS sp_ActualizarProducto$$

CREATE PROCEDURE sp_ActualizarProducto(
    IN p_Codigo VARCHAR(64),       -- Ajustado a 64 chars como tu tabla
    IN p_Nombre VARCHAR(24),       -- Ajustado a 24 chars
    IN p_Descripcion VARCHAR(24),  -- Ajustado a 24 chars
    IN p_Peso DECIMAL(10,2),
    IN p_Categoria VARCHAR(32),    -- Recibimos NOMBRE (Texto)
    IN p_Proveedor VARCHAR(32),    -- Recibimos NOMBRE (Texto)
    IN p_FechaCaducidad DATE,
    IN p_Unidades INT,
    IN p_Precio DECIMAL(10,2)
)
BEGIN
    -- Variables para guardar los IDs numéricos
    DECLARE v_CategoriaNum INT;
    DECLARE v_ProveedorNum INT;

    -- 1. Buscamos el ID de la Categoría usando el nombre que mandó el frontend
    SELECT num INTO v_CategoriaNum 
    FROM CATEGORIA 
    WHERE descripcion = p_Categoria 
    LIMIT 1;

    -- 2. Buscamos el ID del Proveedor usando el nombre
    SELECT num INTO v_ProveedorNum 
    FROM PROVEEDOR 
    WHERE nombre = p_Proveedor 
    LIMIT 1;

    -- 3. Actualizamos la tabla ARTICULO usando los nombres EXACTOS de tu script
    UPDATE ARTICULO
    SET 
        nombre = IFNULL(p_Nombre, nombre),
        descripcion = IFNULL(p_Descripcion, descripcion),
        peso = IFNULL(p_Peso, peso),
        
        -- Guardamos el NÚMERO, no el texto. Si no encontró ID, deja el que estaba.
        categoria = IFNULL(v_CategoriaNum, categoria),
        proveedor = IFNULL(v_ProveedorNum, proveedor),
        
        -- Aquí estaba el error anterior: corregido a CamelCase
        fechaCaducidad = IFNULL(p_FechaCaducidad, fechaCaducidad),
        
        unidades = IFNULL(p_Unidades, unidades),
        precio = IFNULL(p_Precio, precio),
        
        -- Corregido a CamelCase
        ultimaModificacion = CURDATE()
        
    WHERE codigo = p_Codigo;
END$$

DELIMITER ;



USE AbarrotesJuarez;

DROP PROCEDURE IF EXISTS SP_VENTA;
DELIMITER $$
CREATE PROCEDURE SP_VENTA(
    IN _total DECIMAL(10,2),
    IN _metodoPago VARCHAR(5),
    IN _tipoPago VARCHAR(5),
    IN _recibido DECIMAL(10,2),
    IN _cambio DECIMAL(10,2),
    IN _saldo INT,
    IN _fechaVenta DATE
)
BEGIN
    -- Insertamos la venta
    INSERT INTO VENTA (total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta)
    VALUES (_total, _metodoPago, _tipoPago, _recibido, _cambio, _saldo, _fechaVenta);
    
    -- ESTO ES LO IMPORTANTE: Devolvemos el ID generado
    SELECT LAST_INSERT_ID() as id;
END$$
DELIMITER ;

-- Procedimiento para insertar los productos de la venta
DROP PROCEDURE IF EXISTS SP_ARTICULOS_POR_VENTA;
DELIMITER $$
CREATE PROCEDURE SP_ARTICULOS_POR_VENTA(
    IN _venta INT,
    IN _articulo VARCHAR(64),
    IN _cantidad INT,
    IN _importe DECIMAL(10,2)
)
BEGIN
    INSERT INTO ARTICULO_POR_VENTA (venta, articulo, cantidad, importe)
    VALUES (_venta, _articulo, _cantidad, _importe);
END$$
DELIMITER ;

