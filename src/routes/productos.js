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
  
  rutaProducto.get('/:id', (req, res) => {
  
  });
  
  rutaProducto.post('/', privilegio, (req, res) => {
    
  });
  
  rutaProducto.put('/:id', privilegio, async (req, res) => {
    const idProducto = parseInt(req.params.id);
    const producto = req.body;
    await productos.update(idProducto, producto);
    res.json(producto);
  });
  
  rutaProducto.delete('/:id', privilegio, (req, res) => {
    
  });
  
  export { rutaProducto };