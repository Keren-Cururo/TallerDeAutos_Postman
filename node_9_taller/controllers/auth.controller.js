const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db"); // Importar la conexión a la base de datos

// Función para registrar usuario
const register = (req, res) => {
    const {nombre_usuario, apellido_usuario, telefono, correo_electronico, fecha_nacimiento, fecha_registro,  password, id_genero, id_rol, id_localidad} = req.body;

    // Verificar si el usuario ya existe
    db.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [correo_electronico], (error, results) => {
        if (error) {
            console.error("Registration error:", error);
            return res.status(500).send("Error checking user existence");
        }

        if (results.length > 0) {
            return res.status(400).send("User with that email already exists.");
        }

        // Encriptar la contraseña
        bcrypt.hash(password, 8, (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Error hashing password");
            }

            // Insertar nuevo usuario en la base de datos
            db.query('INSERT INTO usuarios (nombre_usuario, apellido_usuario, telefono, correo_electronico, fecha_nacimiento, fecha_registro,  password, id_genero, id_rol, id_localidad) VALUES (?, ?, ?, ?, ? ,? ,? ,? ,? ,?)', [nombre_usuario, apellido_usuario, telefono, correo_electronico, fecha_nacimiento, fecha_registro,  password, id_genero, id_rol, id_localidad, hash], (insertError, insertResults) => {
                if (insertError) {
                    console.error("Error inserting user:", insertError);
                    return res.status(500).send("Error registering user");
                }

                // Obtener el ID del usuario recién creado
                const userId = insertResults.insertId;

                // Generar un token JWT con el ID del usuario
                const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });

                // Enviar la respuesta con el token
                res.status(201).send({ auth: true, token });
            });
        });
    });
};

// Función para hacer login
const login = (req, res) => {
    const { correo_electronico, password } = req.body;

    // Buscar al usuario por correo electrónico
    db.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [correo_electronico], (error, results) => {
        if (error) {
            console.error("Login error:", error);
            return res.status(500).send("Error during login");
        }

        // Verificar si el usuario existe
        if (results.length === 0) {
            return res.status(404).send("User not found.");
        }

        const user = results[0];

        // Comparar la contraseña
        bcrypt.compare(password, user.Password, (err, passwordIsValid) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send("Error comparing passwords");
            }

            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }

            // Generar un token JWT con el ID del usuario
            const token = jwt.sign({ id: user.id_usuario }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            // Enviar la respuesta con el token
            res.send({ auth: true, token });
        });
    });
};

module.exports = {
    register,
    login,
};