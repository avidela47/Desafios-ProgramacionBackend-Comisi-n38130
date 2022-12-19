// Ruta de productos
import express from 'express';
// import { Contenedor } from '../contenedor/contenedorFs.js';
import Contenedor from '../daos/productos/productosDaoMongoDb.js';
const rutaProducto = express.Router();
const productos = new Contenedor();

const privilegio = (req, res, next) => {
    const administrador = req.headers.administrador;
    if (administrador === 'true') {
      next();
    } else {
      res.status(401).send({ error : -1, descripcion: `ruta ${req.url} no autorizada` });
    }
  };
  
  //Endpoints
  
  rutaProducto.get('/', async (req, res) => {
    const listaProductos = await productos.getAll();
    res.json(listaProductos);
  });
  
  rutaProducto.get('/:id', async (req, res) => {
    const {id} = req.body
    const producto = await productos.getById(id);
    res.json(producto);
  });
  
  rutaProducto.post('/', privilegio, async (req, res) => {
    const producto =  req.body
    const id = await productos.save(producto);
    res.json(id);
  });
  
  rutaProducto.put('/:id', privilegio, async (req, res) => {
    const idProducto = parseInt(req.params.id);
    const producto = req.body;
    await productos.update(idProducto, producto);
    res.json(producto);
  });
  
  rutaProducto.delete('/:id', privilegio,  async (req, res) => {
    const idProducto = parseInt(req.params.id);
    await productos.deleteById(idProducto);
    res.json({
        status: 'producto eliminado'
    });
  });
  
  export { rutaProducto };