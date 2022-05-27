CREATE TABLE producto (
    id_producto SERIAL PRIMARY KEY,
    producto TEXT,
    descripcion TEXT,
    foto TEXT, 
    estatus BOOLEAN DEFAULT true
);

CREATE OR REPLACE FUNCTION agregar_producto (
	v_producto TEXT,
	v_descripcion TEXT,
	v_foto TEXT)
    RETURNS TEXT
	LANGUAGE plpgsql
AS $$
DECLARE 
	o_id_producto INT;
	o_resultado TEXT;
BEGIN 
	INSERT INTO producto (producto, descripcion, foto) 
	VALUES (v_producto, v_descripcion, v_foto)
	RETURNING id_producto INTO o_id_producto;
	SELECT 'Producto agregado: ' ||  o_id_producto || ': ' || v_producto INTO o_resultado
		FROM producto WHERE id_producto = o_id_producto;
	RETURN o_resultado;
END;
$$;

CREATE OR REPLACE FUNCTION editar_producto (
    v_id_producto INT,
	v_producto TEXT,
	v_descripcion TEXT,
	v_foto TEXT)
    RETURNS TEXT
	LANGUAGE plpgsql
AS $$
DECLARE 
	o_id_producto INT;
	o_resultado TEXT;
BEGIN 
	UPDATE producto SET 
        producto = v_producto, 
        descripcion = v_descripcion, 
        foto = v_foto
	WHERE id_producto = v_id_producto;
	SELECT 'Producto editado: ' || o_id_producto::text || ': ' || v_producto INTO o_resultado
		FROM producto WHERE id_producto = v_id_producto;
	RETURN o_resultado;
END;
$$;

CREATE OR REPLACE FUNCTION alta_producto (
    v_id_producto INT,
    v_estatus BOOLEAN)
    RETURNS TEXT
	LANGUAGE plpgsql
AS $$
DECLARE 
	o_resultado TEXT;
BEGIN 
	UPDATE producto SET 
        estatus = v_estatus 
	WHERE id_producto = v_id_producto;
	SELECT 'Estatus de producto actualizado: ' || v_id_producto INTO o_resultado
		FROM producto WHERE id_producto = v_id_producto;
	RETURN o_resultado;
END;
$$;

CREATE OR REPLACE VIEW mostrarProductos AS 
    SELECT id_producto, producto, descripcion, foto, estatus FROM producto;
    