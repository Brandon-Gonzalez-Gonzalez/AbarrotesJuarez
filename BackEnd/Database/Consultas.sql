USE AbarrotesJuarez

--Visualizacion de inventario
SELECT A.codigo AS Codigo,
       A.nombre AS Nombre,
       A.descripcion AS Descripcion,
       C.descripcion AS Categoria,
       DATE_FORMAT(A.ultimaModificacion, '%d/%m/%Y') AS "Ultima modificacion",
       A.peso AS Peso,
       A.unidades AS Unidades,
       A.precio AS Precio
FROM ARTICULO AS A
INNER JOIN CATEGORIA AS C ON A.categoria = C.num

--Visualizacion de ganancias
SELECT V.num AS Registro,
       V.fechaVenta AS "Fecha de la venta",
       MP.descripcion AS "Metodo de pago",
       A.nombre AS Articulo,
       AV.cantidad AS Cantidad,
       V.total AS Ganancia
FROM VENTA AS V
INNER JOIN METODO_PAGO AS MP ON V.metodoPago = MP.codigo
INNER JOIN ARTICULO_VENTA AS AV ON V.num = AV.num
INNER JOIN ARTICULO AS A ON AV.articulo = A.codigo
WHERE V.tipoPago = "CONTA"

--Visualizacion de saldos
SELECT 
    S.num AS Registro,
    V.num AS Venta,
    CONCAT(S.nombre, ' ', S.primerApell, ' ', S.segApell) AS "Nombre del cliente",
    S.fechaRegistro AS "Fecha de registro",
    S.fechaPago AS "Fecha de pago",
    S.deuda AS Deuda,
    S.pago AS Pago,
    S.total AS Total
FROM VENTA AS V
INNER JOIN SALDO AS S ON V.saldo = S.num;

--KPI de ganancias
SELECT 
    SUM(Ganancia) AS Ganancias,
    SUM(Cantidad) AS "Articulos vendidos"
FROM VW_GANANCIAS

--KPI de saldos
SELECT 
    SUM(Deuda) AS "Ganancias retenidas",
    COUNT(DISTINCT `Nombre del cliente`) AS "Total de personas"
FROM VW_SALDOS

--GRAFICA de ganancias vs saldos
SELECT  
    G.`Fecha de la venta`,
    G.`Ganancia obtenida`,
    S.`Ganancia retenida` 

FROM (SELECT `Fecha de la venta`, SUM(Ganancia) AS "Ganancia obtenida"
      FROM VW_GANANCIAS
      GROUP BY `Fecha de la venta`) AS G

INNER JOIN (SELECT `Fecha de registro`, SUM(Deuda) AS "Ganancia retenida"
            FROM VW_SALDOS
            GROUP BY `Fecha de registro`) AS S
ON G.`Fecha de la venta` = S.`Fecha de registro`

--GRAFICA de promedio de ventas 
SELECT  
    `Fecha de la venta`,
    COUNT(*) AS "Total de ventas"
FROM VW_GANANCIAS
GROUP BY `Fecha de la venta`
ORDER BY `Fecha de la venta`

