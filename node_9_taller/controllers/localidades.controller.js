//CAMPOS TABLA LOCALIDADES
// id_localidad
// nombre_

const db = require("../db/db");

//// METODO GET  /////

// Para todos los generos
const allLocalidades = (req, res) => {
    const sql = "SELECT * FROM localidades";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// // Para un genero
const showLocalidad = (req, res) => {
    const {id_localidad} = req.params;
    const sql = "SELECT * FROM localidades WHERE id_localidad = ?";
    db.query(sql,[id_localidad], (error, rows) => {
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


//// METODO POST - crear genero ////
const storeLocalidad = (req, res) => {
    const {nombre_localidad} = req.body;
    const sql = "INSERT INTO localidades (nombre_localidad) VALUES (?)";
    db.query(sql,[nombre_localidad], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const rol = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(rol); // muestra creado con exito el elemento
    });     

};


//// METODO PUT  ////
const updateLocalidad = (req, res) => {
    const {id_localidad} = req.params;
    const {nombre_localidad} = req.body;
    const sql ="UPDATE localidades SET nombre_localidad = ?  WHERE id_localidad= ?";
    db.query(sql,[nombre_localidad, id_localidad], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El servicio a modificar no existe"});
        };
        
        const localidad = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(localidad); // mostrar el elemento que existe
    });     
};

//// METODO DELETE ////
const destroyLocalidad = (req, res) => {
    const {id_localidad} = req.params;
    const sql = "DELETE FROM localidades WHERE id_localidad = ?";
    db.query(sql,[id_localidad], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La localidad a borrar no existe"});
        };
        res.json({mesaje : "Localidad eliminada"});
    }); 
};





// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allLocalidades,
    showLocalidad,
    storeLocalidad,
    updateLocalidad,
    destroyLocalidad
};
