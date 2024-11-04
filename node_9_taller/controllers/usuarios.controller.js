/// CONTROLADORES DEL MODULO ///
const db = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUsuario = (req, res) => {
    console.log(req.file);
    let imageName = "";
    if (req.file) {
        imageName = req.file.filename;
    }

    // Extraer los datos del cuerpo de la solicitud
    const { nombreUsuario, apellidoUsuario, correoElectronico, telefono, fechaNacimiento, password, idGenero, idRol, idLocalidad } = req.body;

    // Encriptar la contraseña
    let hash = bcrypt.hashSync(password, 8);
    console.log(hash);

    // Verificar si el usuario ya existe
    db.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [correoElectronico], (error, result) => {
        if (error) {
            console.error("Registration error:", error);
            return res.status(500).send("Error checking user existence");
        }

        if (result.length > 0) {
            return res.status(400).send("User with that email already exists.");
        }

         /////////////////////////
        const sql = "INSERT INTO usuarios (nombre_usuario, apellido_usuario, correo_electronico, telefono, fecha_nacimiento, password, imagen, id_genero, id_rol, id_localidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [nombreUsuario, apellidoUsuario, correoElectronico, telefono, fechaNacimiento, hash, imageName, idGenero, idRol, idLocalidad];
        
        db.query(sql, values, (error, result) => {
            if (error) {
                console.log("Error al intentar realizar el insert", error);
                return res.status(500).json({ error: "Error en el código, intente más tarde" });
            }

            // Definir userId
            const userId = result.insertId;

            // Generar un token JWT con el ID del usuario
            const token = jwt.sign(
                { id: userId },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            // Enviar la respuesta con el token
            const userCreado = { ...req.body, id: userId };
            res.status(201).send({ userCreado, token });
        });
    });
};


// login POST
// Función para hacer login
const loginUsuario = (req, res) => {
    const { correoElectronico, password } = req.body;

    // Buscar al usuario por correo electrónico
    db.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [correoElectronico], (error, result) => {
        if (error) {
            console.error("Login error:", error);
            return res.status(500).send("Error during login");
        }

        // Verificar si el usuario existe
        if (result.length === 0) { // Si la longitud del resultado es igual a "0" significa que no encontro nada 
            return res.status(404).send("User not found.");
        }

        const user = result[0]; //El resultado de la funcion trae el ID a la constante user 

        // Comparar la contraseña
        bcrypt.compare(password, user.Password, (error, passwordIsValid) => {
            if (error) {
                console.error("Error comparing passwords:", error);
                return res.status(500).send("Error comparing passwords");
            }

            if (!passwordIsValid) { // si la contraseña es invalida la utenticacion es falsa y el token nulo
                return res.status(401).send({ auth: false, token: null });
            }

            // Generar un token JWT con el ID del usuario
            const token = jwt.sign({ id: user.idUsuario }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            // Enviar la respuesta con el token
            const userCreado = { ...req.body, id: result.insertId };
            res.status(201).send({userCreado, token});
        });
    });
};


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
    const {idUsuario} = req.params;
    const sql = "SELECT * FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [idUsuario], (error, rows) => {
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



//// METODO PUT  ////
const updateUsuario = (req, res) => {
    console.log(req.file); // imprime en consola la info del archvo subido
    let imageName = req.body.imageName || ""; // usar la imagen que ya esta en la bbdd o que marque null en caso de no tener
    if (req.file) {
        imageName = req.file.filename;
    }

    const {idUsuario} = req.params;
    const {nombreUsuario, apellidoUsuario, correoElectronico, telefono,  fechaNacimiento,  password,  idGenero, idRol, idLocalidad} = req.body;

    let hash;
    if(password){// verificamos si el usuario ha proporcionado una nueva contraseña
        hash = bcrypt.hashSync(password,8);// se encripta la nueva contraseña
    }

    console.log(`id de usuario a actualizar: ${idUsuario}`);

    //verificamos si el usuario existe
    const sqlVerificar = "SELECT * FROM usuarios WHERE id_usuario = ?";
    db.query(sqlVerificar, [idUsuario], (error, result) => {
        if(error){
            console.log(error);
            return res.status(500).json({error: "Error"});
        }
        if (result.affectedRows === 0) { 
            return res.status(404).send({ error: "ERROR: El usuario a modificar no existe" }); 
        }
        
        if(result.length===0){ // si la longitud de lo buscado es de 0 significa que no encontro al usuario buscado en la bbdd
            return res.status(404).json({error: "El usuario a modificar no existe"});
        }

        const usuarioExistente = result[0];
        // usar la nueva contraseña con el hash nuevo o usar la antigua
        // puede o ser la antigua o puede ser dependiendo de la condicion la nueva
        const nuevaPassword = hash || usuarioExistente.password;

        const sql ="UPDATE usuarios SET nombre_usuario=?, apellido_usuario=?, correo_electronico=?, telefono=?, fecha_nacimiento=?, password=?, id_genero=?, id_rol=?, id_localidad=? WHERE id_usuario=?";
        // le pasamos la nueva password a la bbdd
        db.query(sql,[nombreUsuario, apellidoUsuario, correoElectronico, telefono,  fechaNacimiento,  nuevaPassword, imageName, idGenero, idRol, idLocalidad, idUsuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a modificar no existe"});
        };
        
        const usuario = {...req.body, idUsuario}; // ... reconstruir el objeto del body
        res.json(usuario); // mostrar el elemento que existe
        });
    });     
};


//// METODO DELETE ////
const destroyUsuario = (req, res) => {
    const {idUsuario} = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql,[idUsuario], (error, result) => {
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
    registerUsuario,
    loginUsuario,
    allUsuario,
    showUsuario,
    updateUsuario,
    destroyUsuario
};