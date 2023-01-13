import productosApiRouter from '../../api/productos.js'

export default async function configurarSocket(socket, sockets) {
    socket.emit('productos', await productosApi.listarAll());

    socket.on('update', async producto => {
        await productosApiRouter.guardar(producto)
        sockets.emit('productos', await productosApiRouter.listarAll());
    })
}