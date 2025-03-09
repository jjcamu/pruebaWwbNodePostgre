
//CREO EL SERVIDOR

//importo los modulos
const express = require ('express') //express es un framework de node, que me facilita la programacion del servidor
const cors = require ('cors')  // este modulo me permite la conexion entre frontend y backend
const {Pool} = require('pg') //Pool es el objeto que me permite conectarme a la BBDD y hacer consultas

const port = 3000;

//creo una aplicacion de express (estoy creando el servidor)
const app = express()

app.use(cors())
app.use(express.json()) //indico al sistema que para las peticiones y respuestas, se usará el formato json.



// GESTIONO LAS PETICIONES DEL CLIENTE

// proceso la peticion (request) de tipo 'post' que recibo del cliente
app.post('/infoUsuario', (req, res) => {
    agregarInfo (req.body.nombre, req.body.edad)

  })

// proceso peticion 'get'
  app.get('/infoUsuario', (req, res) => {
    res.send('Hello World!') 
  })
  
  app.listen(port, () => {
    console.log(`El servidor a la escucha del puerto ${port}`)
  })


// BASE DE DATOS ---------------------------------------------------------  

//me conecto a la BBDD
const pool = new Pool({
  //con 'process.env' invoco a la variable de entorno, sino existe, almaceno 'localhost'
  // Definire la variable de entorno, recien en fase de produccion. (ej : en render.com) 
    host: process.env.URL_BASE_DE_DATOS || 'localhost',  
    port: 5432,
    database: 'primer_programa_db',
    user: process.env.USUARIO || 'postgres',
    password: process.env.PASS || 'camusoft',
})


//funcion que realiza la consulta a la base de datos

const agregarInfo = async (nombre, edad) =>{

    try {
        await pool.query("INSERT INTO usuarios VALUES ('" + nombre + "', " + edad + ");")
        console.log('usuario cargado!')
        
    }catch (error){

        console.error(error)

    }


}


