INSERT INTO METODO_PAGO(codigo, descripcion)
VALUES ("EFECT", "Efectivo"),
       ("TARJE", "Tarjeta"),
       ("DOLAR", "Dolar")

INSERT INTO TIPO_PAGO(codigo, descripcion)
VALUES ("CONTA", "Contado"),
       ("SALDO", "Saldo")

INSERT INTO CATEGORIA(descripcion)
VALUES ("Sabritas Barcel")

INSERT INTO VENTA(fechaVenta, total, recibido, cambio, metodoPago, tipoPago, saldo)
VALUES ("2024-09-08", 22.00, 50.00, 28.00, "EFECT", "CONTA", NULL),
       ("2024-09-08", 44.00, NULL, NULL, "EFECT", "SALDO", 1)

INSERT INTO ARTICULO(codigo, nombre, descripcion, ultimaModificacion, unidades, precio, categoria)
VALUES ("02456812", "Takis", "Takis fuego Barcel de 56 gramos", "2024-09-08", 3, 22.00, 1)

INSERT INTO SALDO(nombre, primerApell, segApell, fechaRegistro, fechaPago, deuda, pago, total)
VALUES ("Brandon", "Gonzalez", "Gonzalez", "2024-09-08", NULL, 44.00, NULL, 44.00)

INSERT INTO ARTICULO_VENTA(venta, articulo, cantidad, total)
VALUES (1, "02456812", 1, 22),
       (2, "02456812", 2, 44)



select * from VENTA

use AbarrotesJuarez

INSERT INTO ARTICULO(codigo, nombre, descripcion, ultimaModificacion, unidades, precio, categoria)
VALUES ("012345", "articulo", "prueba", "2024-09-27", 3, 22.00, 1)
