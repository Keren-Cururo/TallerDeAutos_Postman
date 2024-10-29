//CAMPOS TABLA EMPLEADOS
// id_empleado
// id_usuario

const db = require("../db/db");

//// METODO GET  /////

// Para todos los generos
const allEmpleados = (req, res) => {
    const sql = "SELECT * FROM empleados";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// // Para un empleado
const showEmpleado = (req, res) => {
    const {id_empleado} = req.params;
    const sql = "SELECT * FROM empleados WHERE id_empleado = ?";
    db.query(sql,[id_empleado], (error, rows) => {
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


//// METODO POST - crear cargo ////
const storeEmpleado = (req, res) => {
    const {cargo} = req.body;
    const sql = "INSERT INTO empleados (cargo) VALUES (?)";
    db.query(sql,[cargo], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const rol = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(rol); // muestra creado con exito el elemento
    });     

};


//// METODO PUT  ////
const updateEmpleado = (req, res) => {
    const {id_empleado} = req.params;
    const {cargo} = req.body;
    const sql ="UPDATE empleados SET cargo = ?  WHERE id_empleado ?";
    db.query(sql,[cargo, id_empleado], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El servicio a modificar no existe"});
        };
        
        const empleado = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(empleado); // mostrar el elemento que existe
    });     
};

//// METODO DELETE ////
const destroyEmpleado= (req, res) => {
    const {id_empleado} = req.params;
    const sql = "DELETE FROM empleados WHERE id_empleado = ?";
    db.query(sql,[id_empleado], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La localidad a borrar no existe"});
        };
        res.json({mesaje : "Empleado eliminado"});
    }); 
};





// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allEmpleados,
    showEmpleado,
    storeEmpleado,
    updateEmpleado,
    destroyEmpleado
};
