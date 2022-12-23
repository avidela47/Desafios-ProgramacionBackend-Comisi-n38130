// Expres / Moment
import express from 'express';
const app = express();
import moment from 'moment';
import faker from 'faker'
faker.locale = 'es';
import { normalize, schema } from 'normalizr';

//Socket / Http
import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Sql
import options from './connection/options.js';
import knex from 'knex';
const connectionMysql = knex(options.mysql);
const connectionSqlite3 = knex(options.sqlite3);

// Contenedor
import ContenedorSql from './contenedor/contenedorSql.js';
const productos = new ContenedorSql(options.mysql, 'productos');
const mensajes = new ContenedorSql(options.sqlite3, 'mensajes');

// Puerto
const port = 8080;

//Lineas para usar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//***** Hacemos la carpeta public visible
const publicRoot = './public';
app.use(express.static(publicRoot));

//Endpoints
// app.get('/', (req, res) => {
//   res.send('index.html', { root: publicRoot });
// });

app.get('/api/productos-test', (req, res) => {
  const productosAleatorios = [];
  for (let index = 0; index < 5; index++) {
      productosAleatorios.push({
          id: index + 1,
          nombre: faker.name.firstName(),
          precio: faker.commerce.price(),
          img: faker.image.imageUrl()
      });
  }
  res.json(productosAleatorios);
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
  socket.emit('mensajes', await obtenerMensajesNormalizados())

  // Evento para recibir nuevos mensajes
  socket.on('new-message', async data => {
    data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
    await mensajes.save(data);
    io.sockets.emit('mensajes', await obtenerMensajesNormalizados());
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
        table.string('text', 100).notNullable()
        table.string('text', 100).notNullable()
        table.string('text', 100).notNullable()
        table.string('text', 100).notNullable()
        table.string('text', 100).notNullable()
        table.string('text', 100).notNullable()
        table.string('text', 100).notNullable()
      }).then(() => console.log('Tabla creada con exito'))
        .catch((err) => console.log(err));
    }
  });

// Definicion de esquemas

const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new schema.Entity('post', {
    autor: autorSchema
}, { idAttribute: 'id' });

const mensajesSchema = new schema.Entity('posts', {
    mensajes: [mensajeSchema]
}, { idAttribute: 'id' });

// Funciones custom

const obtenerMensajesNormalizados = async () => {
    const arregloMensajes = await mensajes.getAll();
    return normalize({
        id: 'mensajes',
        mensajes: arregloMensajes,
    }, mensajesSchema);
};




