const express = require('express');
const moment = require('moment');
const Contenedor = require("./contenedor/contenedorFs");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const productos = new Contenedor('./src/db/productos.txt');
const mensajes = new Contenedor('./src/db/mensajes.txt');

const PORT = 8080;
const publicRoot = './public';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// Hacemos la carpeta public visible
app.use(express.static(publicRoot));

app.get('/', (req, res) => {
    res.send('index.html', { root:publicRoot });
  });

  
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando: ${server.address().port}`);
  });
  
  server.on('error', error => console.log(`Error: ${error}`));

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conctado!');

  const listaProductos = await productos.getAll();
  socket.emit('nueva-conexion', listaProductos);

  socket.on('new-product', (data) => {
    productos.save(data);
    io.sockets.emit('producto', data);
  });

  // Para enviar todos los mensajes en la primera conexion
  const listaMensajes = await mensajes.getAll();
  socket.emit('messages', listaMensajes);

  // Evento para recibir nuevos mensajes
  socket.on('new-message', async data => {
      data.time = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
      await mensajes.save(data);
      const listaMensajes = await mensajes.getAll();
      io.sockets.emit('messages', mensajes);
  });
});