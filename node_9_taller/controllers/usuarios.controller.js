/// CONTROLADORES DEL MODULO ///

// Campos de la tabla usuarios
// id_usuario
// nombre_usuario 1
// apellido_usuario 2
// correo_electronico 3 
// telefono 4
// fecha_nacimiento 5 
// fecha_registro 6 
// imagen
// password 7 
// id_genero 8 
// id_rol 9 
// id_localidad 10



const db = require("../db/db");

//// METODO GET  /////

// Para todos los usuarios
const allUsuario = (req, res) => {
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};




// Para un usuario
const showUsuario = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    db.query(sql,[id_usuario], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el usuario buscado"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};
//// METODO POST  ////
const storeUsuario = (req, res) => {
    console.log(req.file);
    let imageName = "";

    if(req.file){
        imageName = req.file.filename;
    };

    const {nombre_usuario, apellido_usuario, correo_electronico, telefono, fecha_nacimiento, fecha_registro,  password, id_genero, id_rol, id_localidad} = req.body;

    const sql = "INSERT INTO usuarios (nombre_usuario, apellido_usuario, correo_electronico, telefono, fecha_nacimiento, fecha_registro,  password, imagen,  id_genero, id_rol, id_localidad) VALUES (?,?,?,?,?,?,?,?,?,?,?)";


    db.query(sql,[nombre_usuario, apellido_usuario, correo_electronico, telefono, fecha_nacimiento, fecha_registro,  password, imageName,  id_genero, id_rol, id_localidad], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const usuario = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(usuario); // muestra creado con exito el elemento
    });     

}






//// METODO PUT  ////
const updateUsuario = (req, res) => {
    const {id_usuario} = req.params;
    const {nombre_usuario, apellido_usuario, telefono, correo_electronico, fecha_nacimiento, fecha_registro,  password, imagen,  id_genero, id_rol, id_localidad} = req.body;
    const sql ="UPDATE usuarios SET nombre_usuario = ?, apellido_usuario = ?, telefono =?, correo_electronico =?, fecha_nacimiento =?, fecha_registro =?, password = ?, id_genero =?, id_rol= ?, id_localidad =? WHERE id_usuario = ?";
    db.query(sql,[nombre_usuario, apellido_usuario, telefono, correo_electronico, fecha_nacimiento, fecha_registro,  password, imagen, id_genero, id_rol, id_localidad, id_usuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a modificar no existe"});
        };
        
        const usuario = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(usuario); // mostrar el elemento que existe
    });     
};


//// METODO DELETE ////
const destroyUsuario = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql,[id_usuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a borrar no existe"});
        };
        res.json({mesaje : "Usuario Eliminado"});
    }); 
};




// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allUsuario,
    showUsuario,
    storeUsuario,
    updateUsuario,
    destroyUsuario
};