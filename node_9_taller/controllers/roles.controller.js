//controladores del modulo
const db = require("../db/db");

//metodos get para todos los roles
const allRoles = (req,res) => { // falta el req
    const sql = "SELECT * FROM roles";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


// // Para un servicio
const showRol = (req, res) => {
    const {id_rol} = req.params;
    const sql = "SELECT * FROM roles WHERE id_rol = ?";
    db.query(sql,[id_rol], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el servicio buscado"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST - crear rol ////
const storeRol = (req, res) => {
    const {nombre_rol, descripcion_rol} = req.body;
    const sql = "INSERT INTO roles (nombre_rol, descripcion_rol) VALUES (?,?)";
    db.query(sql,[nombre_rol, descripcion_rol], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const rol = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(rol); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateRol = (req, res) => {
    const {id_rol} = req.params;
    const {nombre_rol, descripcion_rol} = req.body;
    const sql ="UPDATE roles SET nombre_rol = ?, descripcion_rol = ? WHERE id_rol = ?";
    db.query(sql,[nombre_rol, descripcion_rol, id_rol], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El servicio a modificar no existe"});
        };
        
        const rol = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(rol); // mostrar el elemento que existe
    });     
};


//// METODO DELETE ////
const destroyRol = (req, res) => {
    const {id_rol} = req.params;
    const sql = "DELETE FROM roles WHERE id_rol = ?";
    db.query(sql,[id_rol], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El servicio a borrar no existe"});
        };
        res.json({mesaje : "Servicio eliminado"});
    }); 
};

// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allRoles,
    showRol,
    storeRol,
    updateRol,
    destroyRol
};


