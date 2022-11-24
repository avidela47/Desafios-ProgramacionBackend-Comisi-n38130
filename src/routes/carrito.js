// Ruta de productos
import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs.js';
const rutaCarrito = express.Router();
const carritos = new Contenedor('src/db/carritos.json');
const productos = new Contenedor('src/db/productos.json');


// Endpoints
rutaCarrito.get('/', async (req, res) => {
    console.log(`post req recibida con exito`);
    const listaCarritos = await carritos.getAll();
    res.json(listaCarritos);
});

rutaCarrito.delete('/:id', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    await carritos.deleteById(idCarrito);
    res.json({
        status: 'producto eliminado'
    });
});

rutaCarrito.get('/:id/productos', async (req, res) => {
    console.log(`getById req recibida con exito`);
    const idCarrito = parseInt(req.params.id);
    const listaProductos = await carritos.deleteById(idCarrito);
    res.json(listaProductos.productos);
});

rutaCarrito.post('/', async (req, res) => {
   const carrito = {
    timestamp: Date.now(),
    productos: []
   };
   const id = await carritos.save(carrito);
   res.json(id);
});

rutaCarrito.post('/:id/productos', async (req, res) => {
    const idCarrito = parseInt(req.params.id);
  const idProducto = req.body.idProducto;
  const producto = await req.getById(idProducto);
  const carrito = await carritos.getById(idCarrito);
  carrito.productos.push(producto);
  await carritos.update(idCarrito, carrito);
  res.json({
    status: 'ok'
  });
});

rutaCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const idCarrito = parseInt(peticion.params.id);
    const idProducto = parseInt(peticion.params.id_prod);
    const carrito = await carritos.getById(idCarrito);
    let indexToDelete = -1;
    carrito.productos.forEach((producto, index) => {
      if (producto.id == idProducto) {
        indexToDelete = index;
      }
    });
    if (indexToDelete => 0) {
      carrito.productos.splice(indexToDelete, 1);
    }
    await carritos.update(idCarrito, carrito);
    respuesta.json({
      status: 'producto eliminado'
    });
});

export { rutaCarrito };