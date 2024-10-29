// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyecto
// require("dotenv").config();
require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());
// en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera
// lo voy a poder utilizar

const serviciosRouter = require('./node_9_taller/routers/servicios.router');
app.use('/servicios', serviciosRouter);
// Siempre que me refiera a peliculas le coloco el prefijo

const usuariosRouter = require('./node_9_taller/routers/usuarios.router');
app.use('/usuarios', usuariosRouter);

// app.use("/auth", require("./routers/auth.router"));

const generosRouter = require('./node_9_taller/routers/generos.router');
app.use('/generos', generosRouter);

const localidadesRouter = require('./node_9_taller/routers/localidades.router');
app.use('/localidades', localidadesRouter);

const empleadosRouter = require('./node_9_taller/routers/empleados.router');
app.use('/empleados', empleadosRouter);

const rolesRouter = require('./node_9_taller/routers/roles.router');
app.use('/roles', rolesRouter);

app.get("/", (req, res) => {
    res.send("Hola taller");
});
// Esta es la ruta principal del proyecto "/"


const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));