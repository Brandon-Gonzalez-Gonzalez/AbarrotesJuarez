USE AbarrotesJuarez;
START TRANSACTION;
CALL InsertarVenta(CURDATE(), 0, NULL, NULL, 'EFECT', 'CONTA');
SET @numVenta = LAST_INSERT_ID();
CALL InsertarArticuloVenta(@numVenta, '02456812', 1, 22.00);
UPDATE VENTA
SET total = (SELECT SUM(total) FROM ARTICULO_VENTA WHERE venta = @numVenta)
WHERE num = @numVenta;
UPDATE VENTA
SET recibido = 50.00,
    cambio = 50.00 - total
WHERE num = @numVenta;
COMMIT;
