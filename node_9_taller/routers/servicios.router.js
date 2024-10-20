/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

//// MULTER /////
const multer = require("multer"); 
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads'); // esta carpeta debe existir en el proyecto (raiz)
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); // segundos desde 1970
    },
});

// const upload = multer({storage:"storage"}); // si son iguales simplemente lo puedo escribir como 
// const upload = multer({storage:"storage"});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes = /jpg|jpeg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimetype && path.extname) {
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1}, // aprox 1Mb
});

const controller = require("../controllers/servicios.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allServicio);

// Para un producto
router.get('/:id_servicio', controller.showServicio);

//// METODO POST  ////
router.post('/', upload.single('imagen'), controller.storeServicio);

//// METODO PUT  ////
router.put('/:id_servicio', controller.updateServicio);

//// METODO DELETE ////
router.delete('/:id_servicio', controller.destroyServicio);

// EXPORTAR ROUTERS
module.exports = router;
