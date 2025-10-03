-- Active: 1755982550506@@127.0.0.1@3306
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

--Tablas con llaves foraneas
CREATE TABLE VENTA(
    num INT PRIMARY KEY AUTO_INCREMENT,
    fechaVenta DATE NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    recibido DECIMAL(10,2) NULL,
    cambio DECIMAL(10,2) NULL,
    metodoPago VARCHAR(5) NOT NULL,
    tipoPago VARCHAR(5) NOT NULL,
    saldo INT NULL,
    FOREIGN Key (metodoPago) REFERENCES METODO_PAGO(codigo),
    FOREIGN Key (tipoPago) REFERENCES TIPO_PAGO(codigo),
    FOREIGN Key (saldo) REFERENCES SALDO(num)
)

CREATE TABLE ARTICULO(
    codigo VARCHAR(64) PRIMARY KEY,
    nombre VARCHAR(24) NOT NULL,
    descripcion VARCHAR(24) NOT NULL,
    ultimaModificacion DATE NOT NULL,
    peso DECIMAL (10,2) NULL,
    unidades INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    categoria INT,
    Foreign Key (categoria) REFERENCES CATEGORIA(num)
)

CREATE TABLE SALDO(
    num INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(24) NOT NULL,
    primerApell VARCHAR(32) NOT NULL,
    segApell VARCHAR(32) NULL,
    fechaRegistro DATE NOT NULL,
    fechaPago DATE NULL,
    deuda DECIMAL(10,2) NOT NULL,
    pago DECIMAL(10,2) NULL,
    total DECIMAL(10,2) NOT NULL
)

--Tablas primarias foraneas
CREATE TABLE ARTICULO_VENTA (
    num INT PRIMARY KEY AUTO_INCREMENT,
    venta INT NOT NULL,
    articulo VARCHAR(64) NOT NULL, 
    cantidad INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (articulo) REFERENCES ARTICULO(codigo),
    FOREIGN KEY (venta) REFERENCES VENTA(num)
)

--Consulta de consumo de datos
    SELECT table_schema "database", SUM(data_length + index_length)/1024/1024 "size in MB"
    FROM information_schema.TABLES
    WHERE table_schema = 'AbarrotesJuarez'
    GROUP BY table_schema;
    
    