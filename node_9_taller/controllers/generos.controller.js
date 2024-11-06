// CAMPOS TABLA GENEROS
// id_genero
// nombre_genero

const db = require("../db/db");

//// METODO GET  /////

// Para todos los generos
const allGeneros = (req, res) => {
    const sql = "SELECT * FROM generos";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// // Para un genero
const showGenero = (req, res) => {
    const {id_genero} = req.params;
    const sql = "SELECT * FROM generos WHERE id_genero = ?";
    db.query(sql,[id_genero], (error, rows) => {
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
const storeGenero = (req, res) => {
    const {nombre_genero} = req.body;
    const sql = "INSERT INTO generos (nombre_genero) VALUES (?)";
    db.query(sql,[nombre_genero], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const rol = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(rol); // muestra creado con exito el elemento
    });     

};


//// METODO PUT  ////
const updateGenero = (req, res) => {
    const {id_genero} = req.params;
    const {nombre_genero} = req.body;
    const sql = "UPDATE generos SET nombre_genero = ? WHERE id_genero = ?";
    
    db.query(sql, [nombre_genero, id_genero], (error, result) => {
        console.log(result);
        if (error) {
            console.error("Error updating genero:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El servicio a modificar no existe" });
        }
        
        const genero = { ...req.body, ...req.params }; // reconstruir el objeto del body

        res.json(genero); // mostrar el elemento que existe
    });     
};




//// METODO DELETE ////
const destroyGenero= (req, res) => {
    const {id_genero} = req.params;
    const sql = "DELETE FROM generos WHERE id_genero = ?";
    db.query(sql,[id_genero], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El servicio a borrar no existe"});
        };
        res.json({mesaje : "Genero eliminado"});
    }); 
};





// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allGeneros,
    showGenero,
    storeGenero,
    updateGenero,
    destroyGenero
};
