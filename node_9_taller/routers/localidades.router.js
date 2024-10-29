/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/localidades.controller")



//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allLocalidades);

// Para un producto
router.get('/:id_localidad', controller.showLocalidad);

//// METODO POST  ////
router.post('/', controller.storeLocalidad);

//// METODO PUT  ////
router.put('/:id_localidad', controller.updateLocalidad);

//// METODO DELETE ////
router.delete('/:id_localidad', controller.destroyLocalidad);

// EXPORTAR ROUTERS
module.exports = router;
