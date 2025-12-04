
DELIMITER $$

CREATE TRIGGER trg_actualizar_precio_compra
AFTER INSERT ON ARTICULO_POR_FACTURA
FOR EACH ROW
BEGIN
    UPDATE ARTICULO
    SET 
        precio = NEW.costoVenta,           -- Actualiza el precio público
        ultimaModificacion = CURDATE(),    -- Actualiza la fecha de modificación (obligatorio en tu tabla)
        unidades = unidades + NEW.cantidad -- BONUS: Suma el stock automáticamente
    WHERE codigo = NEW.articulo;
END$$

DELIMITER ;