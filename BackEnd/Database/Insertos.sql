-- Active: 1759981299603@@127.0.0.1@3306@AbarrotesJuarez

INSERT INTO METODO_PAGO(codigo, descripcion) VALUES
('EFECT', 'Efectivo'),
('TARJE', 'Tarjeta'),
('DOLAR', 'Dolar');

INSERT INTO TIPO_PAGO(codigo, descripcion) VALUES
('CONTA', 'Contado'),
('SALDO', 'Saldo');

--(AUTO_INCREMENT, omitir num)
INSERT INTO CATEGORIA(descripcion) VALUES
('Productos lacteos'),
('Frutos secos'),
('Postres congelados'),
('Galletas');

--(AUTO_INCREMENT, omitir num)
INSERT INTO PROVEEDOR(nombre) VALUES
('Lala'),
('Venecia'),
('Helados Holanda'),
('Marinela');

--(AUTO_INCREMENT, omitir num)
INSERT INTO CLIENTE(nombrePila, primerApellido, segApellido) VALUES
('Brandon', 'Gonzalez', 'Gonzalez');

--(AUTO_INCREMENT, omitir num)
INSERT INTO SALDO(fechaRegistro, total, cliente) VALUES
('2025-10-07', 75.00, 1);

--(AUTO_INCREMENT, omitir num)
--pendiente para cuando se cree un trigger que actualice el total del saldo
INSERT INTO PAGO(montoPago, numPago, fechaPago, saldo) VALUES
(20.00, 1, '2025-10-07', 1)

--(AUTO_INCREMENT, omitir num)
INSERT INTO VENTA(total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta) VALUES
(97, 'EFECT', 'CONTA', 100, 3, NULL, '2025-10-07'),
(75, NULL, 'SALDO', NULL, NULL, 1, '2025-10-07');

INSERT INTO VENTA(total, metodoPago, tipoPago, recibido, cambio, saldo, fechaVenta) VALUES
(55, NULL, 'SALDO', 55, NULL, 1, '2025-10-08');

INSERT INTO ARTICULO(codigo, nombre, descripcion, peso, categoria, proveedor, fechaCaducidad, ultimaModificacion, unidades, precio) VALUES
('7501020513134', 'Crema original', 'Envase individual', 196, 1, 1, '2026-10-07', '2025-10-07', 10, 36),
('7502269480027', 'Almendras', 'Paquete individual', 28, 2, 2, '2026-10-07', '2025-10-07', 10, 15),
('7506306415799', 'Magnum clásica', 'Paquete individual', 71.2, 3, 3, '2026-10-07', '2025-10-07', 10, 25),
('7501000138944', 'Galletas Sponch', 'Paquete individual', 120, 4, 4, '2026-10-07', '2025-10-07', 10, 25);


INSERT INTO PEDIDO(codigo, total, fechaPedido, proveedor) VALUES
('010203040506', 360, '2025-10-07', 1),
('111213141516', 150, '2025-10-07', 2),
('212223242526', 250, '2025-10-07', 3),
('313233343536', 250, '2025-10-07', 4);


INSERT INTO ARTICULO_POR_VENTA(venta, articulo, cantidad, importe) VALUES
(1, '7501020513134', 2, 72),
(1, '7501000138944', 1, 25),
(2, '7502269480027', 5, 75);

-- Insertar ARTICULO_POR_PEDIDO
INSERT INTO ARTICULO_POR_PEDIDO(pedido, articulo) VALUES
('010203040506', '7501020513134'),
('111213141516', '7502269480027'),
('212223242526', '7506306415799'),
('313233343536', '7501000138944');

select * from `ARTICULO_POR_VENTA`