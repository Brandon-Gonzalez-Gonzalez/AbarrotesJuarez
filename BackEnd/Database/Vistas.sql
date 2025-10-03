--Vista de Inventario
CREATE VIEW VW_INVENTARIO AS
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

--Vista de ganancias
CREATE VIEW VW_GANANCIAS AS
SELECT V.num AS "Registro",
       DATE_FORMAT(V.fechaVenta, '%d/%m/%Y') AS "Fecha de la venta",
       MP.descripcion AS "Metodo de pago",
       A.nombre AS Articulo,
       AV.cantidad AS Cantidad,
       V.total AS Ganancia
FROM VENTA AS V
INNER JOIN METODO_PAGO AS MP ON V.metodoPago = MP.codigo
INNER JOIN ARTICULO_VENTA AS AV ON V.num = AV.num
INNER JOIN ARTICULO AS A ON AV.articulo = A.codigo
WHERE V.tipoPago = "CONTA"

--Vista de saldos
CREATE VIEW VW_SALDOS AS
SELECT S.num AS Registro,
       V.num AS Venta,
       CONCAT(S.nombre, ' ', S.primerApell, ' ', S.segApell) AS "Nombre del cliente",
       S.fechaRegistro AS "Fecha de registro",
       S.fechaPago AS "Fecha de pago",
       S.deuda AS Deuda,
       S.pago AS Pago,
       S.total AS Total
FROM VENTA AS V
INNER JOIN SALDO AS S ON V.saldo = S.num;

use AbarrotesJuarez

SELECT * FROM VW_INVENTARIO

SELECT * FROM VW_GANANCIAS

SELECT * FROM VW_SALDOS

