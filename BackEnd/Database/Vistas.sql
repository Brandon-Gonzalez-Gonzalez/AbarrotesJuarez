--Vista de Inventario
CREATE VIEW VW_INVENTARIO AS
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

--Vista de ganancias
CREATE VIEW VW_GANANCIAS AS
SELECT V.num AS Registro,
       MP.descripcion AS "Metodo de pago",
       TP.descripcion AS "Tipo de pago",
       V.fechaVenta AS "Fecha de la venta",
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
    S.fechaRegistro AS "Fecha de registro",
    P.montoPago AS "Monto pagado",
    P.fechaPago AS "Fecha de pago",
    S.total AS Total
FROM SALDO AS S
LEFT JOIN PAGO AS P ON S.num = P.saldo
INNER JOIN CLIENTE AS C ON S.cliente = C.num

use AbarrotesJuarez

SELECT * FROM VW_INVENTARIO

SELECT * FROM VW_GANANCIAS

SELECT * FROM VW_SALDOS

