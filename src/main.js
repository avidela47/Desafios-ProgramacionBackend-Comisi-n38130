import express from 'express'

import options from './connection/options.js'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routers/web/auth.js'
import homeWebRouter from './routers/web/home.js'
import productosApiRouter from './routers/api/productos.js'

import addProductosHandlers from './routers/ws/productos.js'
import addMensajesHandlers from './routers/ws/mensajes.js'
//TO DO: Importar el session-mongo------------------------actualizado-*+++*------------------
import session from 'express-session'
import MongoStore from 'connect-mongo'

//---------------------------------------------------------------*+++*--
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    // console.log('Nuevo cliente conectado!');
    addProductosHandlers(socket, io.sockets)
    addMensajesHandlers(socket, io.sockets)
});

//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', 'ejs');



//Configurar el session------------------------actualizado-*+++*------------------
app.use(session({
    //Configuracion con Mongo de forma local
    //  store: MongoStore.create({ mongoUrl: options.mongoLocal.cnxStr }),
    //Configuracion con mongo Atlas
   store: MongoStore.create({ mongoUrl: options.mongoRemote.cnxStr }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

//-------------------------------------------------------------*+++*------------------

//--------------------------------------------
// rutas del servidor API REST

app.use(productosApiRouter)

//--------------------------------------------
// rutas del servidor web

app.use(authWebRouter)
app.use(homeWebRouter)

//--------------------------------------------
// inicio el servidor

const connectedServer = httpServer.listen(options.PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))



