--Vista de Inventario
CREATE VIEW VW_INVENTARIO AS
SELECT A.codigo AS Upc,
       A.nombre AS Nombre,
       A.descripcion AS Descripción,
       A.peso AS "Peso (g)",
       C.descripcion AS Categoria,
       P.nombre AS Proveedor,
       DATE_FORMAT(A.fechaCaducidad, '%d/%m/%Y') AS "Fecha de caducidad",
       DATE_FORMAT(A.ultimaModificacion, '%d/%m/%Y') AS "Última modificación",
       A.unidades AS Unidades,
       A.precio AS Precio
FROM ARTICULO AS A
INNER JOIN CATEGORIA AS C ON A.categoria = C.num
INNER JOIN PROVEEDOR AS P ON A.proveedor = P.num

--Vista de ganancias
CREATE VIEW VW_GANANCIAS AS
SELECT V.num AS Registro,
       MP.descripcion AS "Metodo de pago",
       TP.descripcion AS "Tipo de pago",
       DATE_FORMAT(V.fechaVenta, '%d/%m/%Y') AS "Fecha de la venta",
       V.recibido - COALESCE(V.cambio, 0) AS Ganancia
FROM VENTA AS V
LEFT JOIN SALDO AS S ON V.saldo = S.num
LEFT JOIN METODO_PAGO AS MP ON V.metodoPago = MP.codigo
INNER JOIN TIPO_PAGO AS TP ON V.tipoPago = TP.codigo
WHERE V.recibido IS NOT NULL;   

--Vista de saldos
CREATE VIEW VW_SALDOS AS
SELECT
    S.num AS Registro,
    CONCAT(C.nombrePila, ' ', 
           C.primerApellido, ' ', 
           C.segApellido) AS "Nombre del cliente",
        DATE_FORMAT(S.fechaRegistro, '%d/%m/%Y') AS "Fecha de registro",
    P.montoPago AS "Monto pagado",
    DATE_FORMAT(P.fechaPago, '%d/%m/%Y') AS "Fecha de pago",
    S.total AS Total
FROM SALDO AS S
LEFT JOIN PAGO AS P ON S.num = P.saldo
INNER JOIN CLIENTE AS C ON S.cliente = C.num
WHERE S.total > 0;

CREATE VIEW VW_DETALLE_SALDO AS
SELECT 
    C.num AS Cliente,
    A.nombre AS "Nombre del articulo",
    AV.cantidad,
    AV.importe
FROM CLIENTE AS C
INNER JOIN SALDO AS S ON C.num = S.cliente
INNER JOIN VENTA AS V ON S.num = V.saldo
INNER JOIN ARTICULO_POR_VENTA AS AV ON V.num = AV.venta
INNER JOIN ARTICULO AS A ON AV.articulo = A.codigo

CREATE VIEW VW_FACTURAS AS
SELECT 
    AF.factura AS "Ticket",
    P.nombre AS "Proveedor",
    A.nombre AS "Artículo",
    AF.cantidad AS "Cantidad",
    AF.costoUnitario AS "Costo unitario",
    AF.costoTotal AS "Costo total",
    AF.costoVenta AS "Costo de venta",
    AF.porcentajeVenta AS "Porcentaje",
    DATE_FORMAT(F.fechaFactura, '%d/%m/%Y') AS "Fecha de factura"
FROM ARTICULO_POR_FACTURA AS AF
INNER JOIN ARTICULO AS A ON AF.articulo = A.codigo
INNER JOIN FACTURA AS F ON AF.factura = F.codigo
INNER JOIN PROVEEDOR AS P ON F.proveedor = P.num

use AbarrotesJuarez

SELECT * FROM VW_INVENTARIO

SELECT * FROM VW_GANANCIAS

SELECT * FROM VW_SALDOS

SELECT * FROM VW_DETALLE_SALDO WHERE Cliente = 1 

SELECT * FROM VW_FACTURAS

--EXTRAS

CREATE VIEW VW_LISTA_ARTICULOS AS
SELECT codigo, nombre
FROM ARTICULO

CREATE VIEW VW_LISTA_PROVEEDORES AS
SELECT num, nombre
FROM PROVEEDOR

CREATE OR REPLACE VIEW VW_LISTA_CATEGORIAS AS
SELECT num, descripcion FROM CATEGORIA