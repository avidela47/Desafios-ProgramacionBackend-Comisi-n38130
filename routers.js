const express = require('express');
const Contenedor = require("./contenedor.js");
const { Router } = require('express');
const productos = new Contenedor('./productos.json')
const app = Router();
const notFound = { error: "Producto no encontrado" };


//Endpoints

app.get("/", async (req, res) => {
    console.log(`getAll recibida con exito`);
    const arrayProductos = await productos.getAll();
    !arrayProductos && res.status(404).json(notFound);
    res.status(200).json(arrayProductos);
});

app.get("/:id", async (req, res) => {
    console.log(`getById recibida con exito`);
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    !producto && res.status(404).json(notFound);
    res.status(200).json(producto);
});

app.post("/", async (req, res) => {
    console.log(`post recibida con exito`);
    const data = req.body;
    console.log(data);
    const nuevoProducto = await productos.save(data);
    !data && res.status(204).json(notFound);
    res.status(201).json(data);
});

app.put("/:id", async (req, res) => {
    console.log(`put recibida con exito`);
    const id = parseInt(req.params.id);
    const data = req.body;
    const productoEditado = await productos.modify(id, data);
    !productoEditado && res.status(404).json(notFound);
    res.status(200).json(productoEditado);
});

app.delete("/:id", async (req, res) => {
    console.log(`delete recibida con exito`);
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    const eliminarProducto = await productos.deleteById(id);
    !producto && res.status(404).json(notFound);
    res.status(200).json(producto);
});

module.exports = app;