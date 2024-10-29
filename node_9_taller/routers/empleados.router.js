/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/empleados.controller")


//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allEmpleados);

// Para un producto
router.get('/:id_empleado', controller.showEmpleado);

//// METODO POST  ////
router.post('/', controller.storeEmpleado);

//// METODO PUT  ////
router.put('/:id_empleado', controller.updateEmpleado);

//// METODO DELETE ////
router.delete('/:id_empleado', controller.destroyEmpleado);

// EXPORTAR ROUTERS
module.exports = router;
