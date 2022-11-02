//Servidor
const express = require('express');
const multer = require('multer');
const routers = require("./routers.js");


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routers);

const almacenamiento = multer.diskStorage({
    destination: (req, archivo, next) => {
      next(null, __dirname + '/uploads');
    },
    filename: (req, archivo, next) => {
      next(null, Date.now() + '-' + archivo.originalname);
    }
  });
  
  const upload = multer({
    storage: almacenamiento
  });

  // Hacemos la carpeta public visible
app.use('/static', express.static(__dirname + '/public'));

app.post('/upload', upload.single('myFile'), (req, res) => {
    //Es cuando ya se guardó y preparamosla respuesta al cliente
    const archivo = req.file;
    if (!archivo) {
      const error = new Error('El archivo no fue subido');
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(archivo);
  });

const server = app.listen(PORT, () => {
    console.log(
        `Servidor escuchando en el puerto ${server.address().port}`
    );
});

server.on("error", error => console.log(`Error en servidor: ${error.message}`));