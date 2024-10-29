/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/generos.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allGeneros);

// Para un producto
router.get('/:id_genero', controller.showGenero);


//// METODO PUT  ////
router.put('/:id_genero', controller.updateGenero);

//// METODO DELETE ////
router.delete('/:id_genero', controller.destroyGenero);

// EXPORTAR ROUTERS
module.exports = router;