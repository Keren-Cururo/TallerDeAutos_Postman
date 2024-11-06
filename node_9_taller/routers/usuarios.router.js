/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();
const multer = require("multer"); // multer
const path = require("path"); // es la ruta interna de los archivos en la pc 

const controller = require("../controllers/usuarios.controller");

// esto es para guardar el archivo 
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads'); // esta carpeta debe existir en el proyecto (raiz)
    },
     //es para nombrar el archivo con la fecha con la cual se subio al sistema 
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); // segundos desde 1970
    },
});

// es la validacion de las imagenes subidas
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



//// METODO GET  /////
// Para todos los productos
router.get('/', controller.allUsuario);

// Para un producto
router.get('/:idUsuario', controller.showUsuario);

//// METODO POST  ////  No se le colocan los dos puntos a id usuario porque al registrarse se crear el id usuario 
router.post('/register', upload.single('imageName'), controller.registerUsuario); // imagn en bbdd

router.post('/login', controller.loginUsuario);

// //// METODO PUT  ////
router.put('/:id_usuario', controller.updateUsuario);
// //// METODO PUT  ////
// router.put('/:idUsuario', upload.single('imageName'), controller.updateUsuario);

//// METODO DELETE ////
router.delete('/:idUsuario', controller.destroyUsuario);

// EXPORTAR ROUTERS
module.exports = router;