/// CONTROLADORES DEL MODULO ///

// Campos de la tabla peliculas
// id_servicio
// nombre_servicio
// descripcion
// fecha_alta_servicio

const db = require("../db/db");

//// METODO GET  /////

// Para todos las peliculas
const allServicio = (req, res) => {
    const sql = "SELECT * FROM servicios";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// // Para un servicio
const showServicio = (req, res) => {
    const {id_servicio} = req.params;
    const sql = "SELECT * FROM servicios WHERE id_servicio = ?";
    db.query(sql,[id_servicio], (error, rows) => {
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

//// METODO POST  ////
const storeServicio = (req, res) => {
    console.log(req.file);
    let imageName = "";

    if(req.file){
        imageName = req.file.filename;
    };

    const {nombre_servicio, descripcion, fecha_alta_servicio} = req.body;

    const sql = "INSERT INTO servicios (nombre_servicio, descripcion, fecha_alta_servicio, imagen) VALUES (?,?,?,?)";


    db.query(sql,[nombre_servicio, descripcion, fecha_alta_servicio], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const servicio = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(servicio); // muestra creado con exito el elemento
    });     

}



//// METODO PUT  ////
const updateServicio = (req, res) => {
    const {id_servicio} = req.params;
    const {nombre_servicio, descripcion, fecha_alta_servicio} = req.body;
    const sql ="UPDATE servicios SET nombre_servicio = ?, descripcion = ?, fecha_alta_servicio = ? WHERE id_servicio = ?";
    db.query(sql,[nombre_servicio, descripcion, fecha_alta_servicio, id_servicio], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El servicio a modificar no existe"});
        };
        
        const servicio = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(servicio); // mostrar el elemento que existe
    });     
};

//// METODO DELETE ////
const destroyServicio = (req, res) => {
    const {id_servicio} = req.params;
    const sql = "DELETE FROM servicios WHERE id_servicio = ?";
    db.query(sql,[id_servicio], (error, result) => {
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
    allServicio,
    showServicio,
    storeServicio,
    updateServicio,
    destroyServicio
};
