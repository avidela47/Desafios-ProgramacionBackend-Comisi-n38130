// Servidor
import express from 'express';

// Importar rutas
import { rutaProducto } from './routes/productos.js';
import { rutaCarrito } from './routes/carrito.js';
import { Contenedor } from './db/db.js';
const productos = new Contenedor('src/db/productos.json');

const app = express();
const PORT = process.env.PORT || 8080;
const publicRoot = './public';

// Lineas para usar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Hacemos la carpeta public visible
app.use(express.static(publicRoot));

// Implemantar ruta
app.use('/api/productos', rutaProducto);
app.use('/api/carrito', rutaCarrito);

app.get("/", async (req, res) => {
  console.log(`get req recibida con exito`);
  res.send('index.html', { root:publicRoot });
});

// Midleware de rutas no implementadas
app.use((req, res, next) => {
  if (!req.route) {
    res.status(404).send({ error : -2, descripcion: `ruta ${req.url} no encontrada` });
  } else {
    next();
  }
})

// Server
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando: ${server.address().port}`);
  console.log(`http://localhost:${server.address().port}`);
});
  

server.on('error', error => console.log(`Error: ${error}`));

