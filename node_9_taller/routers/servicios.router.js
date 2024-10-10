/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/servicios.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allServicio);

// Para un producto
router.get('/:id_servicio', controller.showServicio);

//// METODO POST  ////
router.post('/', controller.storeServicio);

//// METODO PUT  ////
router.put('/:id_servicio', controller.updateServicio);

//// METODO DELETE ////
router.delete('/:id_servicio', controller.destroyServicio);

// EXPORTAR ROUTERS
module.exports = router;
