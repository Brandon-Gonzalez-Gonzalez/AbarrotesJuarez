--Indices de busqueda para los articulos
CREATE INDEX IDX_codigoArticulo
ON ARTICULO (codigo)

CREATE INDEX IDX_nombreArticulo
ON ARTICULO (nombre)

CREATE INDEX IDX_descripcionArticulo
ON ARTICULO (descripcion)

