// Expres / Moment
const express = require('express');
const app = express();
const moment = require('moment');

//Socket / Http
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Sql
const options = require('./connection/options.js');
const knex = require('knex');
const connectionMysql = knex(options.mysql);
const connectionSqlite3 = knex(options.sqlite3);

// Contenedor
const Contenedor = require('./contenedor/contenedorSql');
const productos = new Contenedor(options.mysql, 'productos');
const mensajes = new Contenedor(options.sqlite3, 'mensajes');

// Puerto
const port = 8080;

//Lineas para usar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//***** Hacemos la carpeta public visible
const publicRoot = './public';
app.use(express.static(publicRoot));

//Endpoints
app.get('/', (req, res) => {
  res.send('index.html', { root: publicRoot });
});

// Servidor listen
const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));

// Sockets
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');

  const listaProductos = await productos.getAll();
  socket.emit('nueva-conexion', listaProductos);

  socket.on("new-product", (data) => {
    productos.save(data);
    io.sockets.emit('producto', data);
  });

  // Para enviar todos los mensajes en la primera conexion
  const listaMensajes = await mensajes.getAll();
  socket.emit('messages', listaMensajes);

  // Evento para recibir nuevos mensajes
  socket.on('new-message', async data => {
    data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
    await mensajes.save(data);
    const listaMensajes = await mensajes.getAll();
    io.sockets.emit('messages', listaMensajes);
  });
  socket.on('disconnect', () => {
    console.log('Usuario desconectado')
  })
  });
  

// Productos
  connectionMysql.schema.hasTable('productos').then((exists) => {
    if (!exists) {
      connectionMysql.schema.createTable('productos', (table) => {
        table.increments('id').primary
        table.string('nombre', 25).notNulltable()
        table.float('precio')
        table.string('img', 100)
      }).then(() => console.log('Tabla creada con exito'))
      .catch((err) => console.log(err));
    }
  });

// Mensajes
  connectionSqlite3.schema.hasTable('mensajes').then((exists) => {
    if (!exists) {
      connectionSqlite3.schema.createTable('mensajes', (table) => {
        table.increments('id').primary
        table.string('texto', 100).notNullable()
        table.string('email', 100).notNullable()
        table.string('time', 100).notNullable()
      }).then(() => console.log('Tabla creada con exito'))
        .catch((err) => console.log(err));
    }
  });
