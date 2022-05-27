const express = require("express");
const {
  obtenerProductos,
  agregarProducto,
  editarProducto,
  darAltaProducto,
} = require("./../controllers/producto_controller");
const app = express();

app.get("/health", (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

app.get("/producto/get", obtenerProductos);
app.post("/producto/add", agregarProducto);
app.post("/producto/edit", editarProducto);
app.post("/producto/status", darAltaProducto);

module.exports = app;
