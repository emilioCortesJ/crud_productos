const {
  agregarProductoSchema,
  editarProductoSchema,
  darAltaProductoSchema,
} = require("../middleware/productoSchema");
const pool = require("./../config/config");
const { validarError } = require("./../services/validacion");

const obtenerProductos = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM mostrarProductos WHERE estatus");
    res.status(200).send({
      ok: true,
      resultado: resultado.rows,
    });
  } catch (error) {
    res.status(200).send({
      ok: false,
      resultado: null,
      error: error.message,
    });
  }
};

const agregarProducto = async (req, res) => {
  try {
    const validar = validarError(await agregarProductoSchema(req));
    if (validar) {
      if (validar.errores) {
        return res.status(400).send({
          ok: false,
          mensaje: validar.mensaje,
          errores: validar.errores,
        });
      }
      return res.status(400).send({
        ok: false,
        mensaje: validar.mensaje,
      });
    }
    const { producto, descripcion, foto } = req.body;
    const resultado = await pool.query("SELECT agregar_producto($1,$2,$3)", [
      producto,
      descripcion,
      foto,
    ]);
    if (resultado.rowCount > 0) {
      res.status(200).send({
        ok: true,
        resultado: resultado.rows[0].agregar_producto,
      });
    } else {
      res.status(200).send({
        ok: false,
        resultado: "Error al agregar producto",
      });
    }
  } catch (error) {
    res.status(200).send({
      ok: false,
      resultado: error.message,
    });
  }
};

const editarProducto = async (req, res) => {
  try {
    const validar = validarError(await editarProductoSchema(req));
    if (validar) {
      if (validar.errores) {
        return res.status(400).send({
          ok: false,
          mensaje: validar.mensaje,
          errores: validar.errores,
        });
      }
      return res.status(400).send({
        ok: false,
        mensaje: validar.mensaje,
      });
    }
    const { id_producto, producto, descripcion, foto } = req.body;
    const resultado = await pool.query("SELECT editar_producto($1,$2,$3,$4)", [
      id_producto,
      producto,
      descripcion,
      foto,
    ]);
    if (resultado.rowCount > 0) {
      res.status(200).send({
        ok: true,
        resultado: resultado.rows[0].editar_producto,
      });
    } else {
      res.status(200).send({
        ok: false,
        resultado: "Error al editar producto",
      });
    }
  } catch (error) {
    res.status(200).send({
      ok: false,
      resultado: error.message,
    });
  }
};

const darAltaProducto = async(req, res) => {
    try {
        const validar = validarError(await darAltaProductoSchema(req));
        if (validar) {
          if (validar.errores) {
            return res.status(400).send({
              ok: false,
              mensaje: validar.mensaje,
              errores: validar.errores,
            });
          }
          return res.status(400).send({
            ok: false,
            mensaje: validar.mensaje,
          });
        }
        const { id_producto, estatus } = req.body;
        const resultado = await pool.query("SELECT alta_producto($1,$2)", [
          id_producto,
          estatus
        ]);
        if (resultado.rowCount > 0) {
          res.status(200).send({
            ok: true,
            resultado: resultado.rows[0].alta_producto,
          });
        } else {
          res.status(200).send({
            ok: false,
            resultado: "Error al editar producto",
          });
        }
      } catch (error) {
        res.status(200).send({
          ok: false,
          resultado: error.message,
        });
      }
}

module.exports = {
  obtenerProductos,
  agregarProducto,
  editarProducto,
  darAltaProducto
};