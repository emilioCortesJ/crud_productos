const pool = require("../config/config");
const Joi = require("joi");

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

async function agregarProductoSchema(req) {
  try {
    const schema = Joi.object({
      producto: Joi.string().required().min(1).max(100).messages({
        "string.base": `{{#label}} debe ser texto`,
        "string.empty": `"{{#label}}" debe tener texto`,
        "string.min": `"{{#label}}" debe tener al menos 5 caracteres`,
        "string.max": `"{{#label}}" debe tener maximo 200 caracteres`,
        "any.required": `"{{#label}}" es obligatorio`,
      }),
      descripcion: Joi.string().required().min(1).max(200).messages({
        "string.base": `{{#label}} debe ser texto`,
        "string.empty": `"{{#label}}" debe tener texto`,
        "string.min": `"{{#label}}" debe tener al menos 5 caracteres`,
        "string.max": `"{{#label}}" debe tener maximo 200 caracteres`,
        "any.required": `"{{#label}}" es obligatorio`,
      }),
      foto: Joi.string().required().min(1).max(200).messages({
        "string.base": `{{#label}} debe ser texto`,
        "string.empty": `"{{#label}}" debe tener texto`,
        "string.min": `"{{#label}}" debe tener al menos 5 caracteres`,
        "string.max": `"{{#label}}" debe tener maximo 200 caracteres`,
        "any.required": `"{{#label}}" es obligatorio`,
      }),
    });
    return await schema.validateAsync(req.body, options);
  } catch (error) {
    return error;
  }
}

async function editarProductoSchema(req) {
  try {
    const schema = Joi.object({
      id_producto: Joi.number()
        .required()
        .external(async (value) => {
          const res = await pool.query(
            "SELECT COUNT(*) FROM producto WHERE id_producto = $1",
            [value]
          );
          if (res.rows[0].count > 0) {
            return value;
          } else {
            throw new Error("El id de producto no existe");
          }
        })
        .messages({
          "number.base": "{{#label}} debe ser un entero",
          "any.invalid": "{{#label}} no se encuentra en la base de datos",
          "any.required": "{{#label}} es obligatorio",
        }),
      producto: Joi.string().required().min(1).max(100).messages({
        "string.base": `{{#label}} debe ser texto`,
        "string.empty": `"{{#label}}" debe tener texto`,
        "string.min": `"{{#label}}" debe tener al menos 5 caracteres`,
        "string.max": `"{{#label}}" debe tener maximo 200 caracteres`,
        "any.required": `"{{#label}}" es obligatorio`,
      }),
      descripcion: Joi.string().required().min(1).max(200).messages({
        "string.base": `{{#label}} debe ser texto`,
        "string.empty": `"{{#label}}" debe tener texto`,
        "string.min": `"{{#label}}" debe tener al menos 5 caracteres`,
        "string.max": `"{{#label}}" debe tener maximo 200 caracteres`,
        "any.required": `"{{#label}}" es obligatorio`,
      }),
      foto: Joi.string().required().min(1).max(200).messages({
        "string.base": `{{#label}} debe ser texto`,
        "string.empty": `"{{#label}}" debe tener texto`,
        "string.min": `"{{#label}}" debe tener al menos 5 caracteres`,
        "string.max": `"{{#label}}" debe tener maximo 200 caracteres`,
        "any.required": `"{{#label}}" es obligatorio`,
      }),
    });
    return await schema.validateAsync(req.body, options);
  } catch (error) {
    return error;
  }
}

async function darAltaProductoSchema(req) {
  try {
    const schema = Joi.object({
      id_producto: Joi.number()
        .required()
        .external(async (value) => {
          const res = await pool.query(
            "SELECT COUNT(*) FROM producto WHERE id_producto = $1",
            [value]
          );
          if (res.rows[0].count > 0) {
            return value;
          } else {
            throw new Error("El id de producto no existe");
          }
        })
        .messages({
          "number.base": "{{#label}} debe ser un entero",
          "any.invalid": "{{#label}} no se encuentra en la base de datos",
          "any.required": "{{#label}} es obligatorio",
        }),
      estatus: Joi.boolean().required().messages({
        "boolean.base": "{{#label}} debe ser un booleano",
        "any.required": "{{#label}} es obligatorio",
      }),
    });
    return await schema.validateAsync(req.body, options);
  } catch (error) {
    return error;
  }
}

module.exports = {
  agregarProductoSchema,
  editarProductoSchema,
  darAltaProductoSchema
};
