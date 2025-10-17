-- Active: 1760298017574@@127.0.0.1@3306@AbarrotesJuarez

--Creacion de base de datos
CREATE DATABASE AbarrotesJuarez

--Indicador de uso de base de datos
USE AbarrotesJuarez

--Tablas sin llaves foraneas
CREATE TABLE METODO_PAGO(
    codigo VARCHAR(5) PRIMARY KEY,
    descripcion VARCHAR(32) NOT NULL
)

CREATE TABLE TIPO_PAGO(
    codigo VARCHAR(5) PRIMARY KEY,
    descripcion VARCHAR(32) NOT NULL
)

CREATE TABLE CATEGORIA(
    num INT PRIMARY KEY AUTO_INCREMENT,
    descripcion VARCHAR(32) NOT NULL
)

CREATE TABLE PROVEEDOR(
    num INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(32) NOT NULL
) 

CREATE TABLE CLIENTE(
    num INT PRIMARY KEY AUTO_INCREMENT,
    nombrePila VARCHAR(32) NOT NULL,
    primerApellido VARCHAR(32) NOT NULL,
    segApellido VARCHAR(32) NULL
)

--Tablas con llaves foraneas

CREATE TABLE SALDO(
    num INT PRIMARY KEY AUTO_INCREMENT,
    total INT NOT NULL,
    fechaRegistro DATE NOT NULL,
    cliente INT NOT NULL,
    FOREIGN Key (cliente) REFERENCES CLIENTE(num)
)

CREATE TABLE PAGO(
    num INT PRIMARY KEY AUTO_INCREMENT,
    montoPago DECIMAL(10,2) NOT NULL,
    numPago INT NOT NULL,
    fechaPago DATE NOT NULL,
    saldo INT NOT NULL,
    FOREIGN Key (saldo) REFERENCES SALDO(num)
)

CREATE TABLE VENTA(
    num INT PRIMARY KEY AUTO_INCREMENT,
    total DECIMAL(10,2) NOT NULL,
    metodoPago VARCHAR(5) NULL,
    tipoPago VARCHAR(5) NOT NULL,
    recibido DECIMAL(10,2) NULL,
    cambio DECIMAL(10,2) NULL,
    saldo INT NULL,
    fechaVenta DATE NOT NULL,
    FOREIGN Key (metodoPago) REFERENCES METODO_PAGO(codigo),
    FOREIGN Key (tipoPago) REFERENCES TIPO_PAGO(codigo),
    FOREIGN Key (saldo) REFERENCES SALDO(num)
)

CREATE TABLE ARTICULO(
    codigo VARCHAR(64) PRIMARY KEY,
    nombre VARCHAR(24) NOT NULL,
    descripcion VARCHAR(24) NOT NULL,
    peso DECIMAL (10,2) NOT NULL,
    categoria INT NOT NULL,
    proveedor INT NOT NULL,
    fechaCaducidad DATE NOT NULL,
    ultimaModificacion DATE NOT NULL,
    unidades INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    Foreign Key (categoria) REFERENCES CATEGORIA(num),
    Foreign Key (proveedor) REFERENCES PROVEEDOR(num)
)

CREATE TABLE FACTURA(
    codigo VARCHAR(64) PRIMARY KEY, 
    fechaFactura DATE NOT NULL, 
    proveedor INT NOT NULL, 
    FOREIGN KEY (proveedor) REFERENCES PROVEEDOR(num)
)

--Tablas primarias foraneas
CREATE TABLE ARTICULO_POR_VENTA (
    venta INT NOT NULL,
    articulo VARCHAR(64) NOT NULL, 
    cantidad INT NOT NULL,
    importe DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (articulo) REFERENCES ARTICULO(codigo),
    FOREIGN KEY (venta) REFERENCES VENTA(num)
)

CREATE TABLE ARTICULO_POR_FACTURA(
    factura VARCHAR(64) NOT NULL,
    articulo VARCHAR(64) NOT NULL,  
    cantidad INT NOT NULL, 
    costoUnitario DECIMAL(10,2) NOT NULL,
    costoTotal DECIMAL(10,2) NOT NULL,
    costoVenta DECIMAL(10,2) NOT NULL,
    porcentajeVenta DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (articulo) REFERENCES ARTICULO(codigo),
    FOREIGN KEY (factura) REFERENCES FACTURA(codigo)
)

--Consulta de consumo de datos
    SELECT table_schema "database", SUM(data_length + index_length)/1024/1024 "size in MB"
    FROM information_schema.TABLES
    WHERE table_schema = 'AbarrotesJuarez'
    GROUP BY table_schema;
    
    