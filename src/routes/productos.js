// Ruta de productos
import express from 'express';
import { Contenedor } from '../contenedor/contenedorFs.js';
const notFound = { error: "Producto no encontrado" };
const rutaProducto = express.Router();
const productos = new Contenedor('src/db/productos.json');

const admin = (req, res, next) => {
    const administrador = req.header.administrador;
    if (administrador === 'true') {
        next();
    } else {
        res.status(401).send({ error : -1, descripcion: `ruta ${req.url} no autorizada` });
    }
}

// Endpoints
rutaProducto.get('/', async (req, res) => {
    console.log(`getAll req recibida con exito`);
    const arrayProductos = await productos.getAll();
    !arrayProductos && res.status(404).json(notFound);
    res.status(200).json(arrayProductos);
    const id = parseInt(req.params.id);
});

rutaProducto.get('/:id', async (req, res) => {
    console.log(`getById req recibida con exito`);
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    !producto && res.status(404).json(notFound);
    res.status(200).json(producto);
});

rutaProducto.post('/', admin,  async(req, res) => {
    console.log(`post req recibida con exito`);
    const data = req.body;
    console.log(data);
    const nuevoProducto = await productos.save(data);
    !data && res.status(204).json(notFound);
    res.status(201).json(data);
});

rutaProducto.put('/:id', admin, async (req, res) => {
    console.log(`put req recibida con exito`);
    const id = parseInt(req.params.id);
    const data = req.body;
    const productoEditado = await productos.modify(id, data);
    !productoEditado && res.status(404).json(notFound);
    res.status(200).json(productoEditado);
});

rutaProducto.delete('/:id', admin,  async(req, res) => {
    console.log(`delete req recibida con exito`);
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    const eliminarProducto = await productos.deleteById(id);
    !producto && res.status(404).json(notFound);
    res.status(200).json(producto);
});

export { rutaProducto };