-- Active: 1755982550506@@127.0.0.1@3306@abarrotesjuarez
USE AbarrotesJuarez

--Visualizacion de inventario
SELECT A.codigo AS Upc,
       A.nombre AS Nombre,
       A.descripcion AS Descripción,
       A.peso AS "Peso (gr)",
       C.descripcion AS Categoria,
       P.nombre AS Proveedor,
       DATE_FORMAT(A.fechaCaducidad, '%d/%m/%Y') AS "Fecha de caducidad",
       DATE_FORMAT(A.ultimaModificacion, '%d/%m/%Y') AS "Última modificación",
       A.unidades AS Unidades,
       A.precio AS Precio
FROM ARTICULO AS A
INNER JOIN CATEGORIA AS C ON A.categoria = C.num
INNER JOIN PROVEEDOR AS P ON A.proveedor = P.num

--Visualizacion de ganancias 
SELECT
    V.num AS Registro,
    MP.descripcion AS "Metodo de pago",
    TP.descripcion AS "Tipo de pago",
    DATE_FORMAT(V.fechaVenta, '%d/%m/%Y') AS "Fecha de la venta",
    V.recibido - COALESCE(V.cambio, 0) AS Ganancia
FROM VENTA AS V
LEFT JOIN SALDO AS S ON V.saldo = S.num
LEFT JOIN METODO_PAGO AS MP ON V.metodoPago = MP.codigo
INNER JOIN TIPO_PAGO AS TP ON V.tipoPago = TP.codigo
WHERE V.recibido IS NOT NULL

--Visualizacion de saldos
SELECT
    S.num AS Registro,
    CONCAT(C.nombrePila, ' ', 
           C.primerApellido, ' ', 
           C.segApellido) AS "Nombre del cliente",
    S.fechaRegistro AS "Fecha de registro",
    P.montoPago AS "Monto pagado",
    P.fechaPago AS "Fecha de pago",
    S.total AS Total
FROM SALDO AS S
LEFT JOIN PAGO AS P ON S.num = P.saldo
INNER JOIN CLIENTE AS C ON S.cliente = C.num
WHERE S.total > 0

--Visualizacion de articulos por saldo
SELECT 
    A.nombre AS nombre_articulo,
    AV.cantidad,
    AV.importe
FROM CLIENTE AS C
INNER JOIN SALDO AS S ON C.num = S.cliente
INNER JOIN VENTA AS V ON S.num = V.saldo
INNER JOIN ARTICULO_POR_VENTA AS AV ON V.num = AV.venta
INNER JOIN ARTICULO AS A ON AV.articulo = A.codigo

--Visualizacion de facturas
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

--KPI de facturas
SELECT 
    SUM(costoTotal) AS "Costo total",
    SUM((costoVenta - costoUnitario) * cantidad) AS "Ganancias"
FROM ARTICULO_POR_FACTURA

--KPI de facturas por filtro de factura
SELECT 
    SUM(costoTotal) AS "Costo total",
    SUM((costoVenta - costoUnitario) * cantidad) AS "Ganancias"
FROM ARTICULO_POR_FACTURA
WHERE factura = '010203040506'

--KPI de ganancias
SELECT 
    SUM(V.recibido - COALESCE(V.cambio, 0)) AS "Ganancias obtenidas",
    SUM(AV.cantidad) AS "Total de productos vendidos"
FROM VENTA AS V
INNER JOIN ARTICULO_POR_VENTA AS AV ON V.num = AV.venta
   
--KPI de saldos
SELECT 
    SUM(S.total) AS "Ganancias retenidas",
    COUNT(C.num) AS "Total de clientes con saldo"
FROM SALDO AS S
INNER JOIN CLIENTE AS C ON S.cliente = C.num

SELECT codigo, nombre
FROM ARTICULO

SELECT num, nombre
FROM PROVEEDOR