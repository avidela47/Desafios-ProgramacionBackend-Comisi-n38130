const express = require('express');
const Contenedor = require("./contenedor");
const productos = new Contenedor("./productos.json");

const app = express();

const PORT = 8080;

app.get('/', (request, response) => {
    response.send(
        `<h1 style="text-align: center; color:GreenYellow">Tercer desafio<br/> Ariel Videla</h1>`
    );
});

app.get('/productos', (request, response) => {
    const ejecutar = async () => {
        const arrayProductos = await productos.getAll();
        let contenedor = ``;
        arrayProductos.map(
            item =>
                (contenedor += `<div style="background-color: DarkKhaki; color: white; text-align: center; height: auto; width: 300px"><h2>Artista: ${item.nombre}</h2><h3>Precio: $ ${item.precio}</h3><img style="margin-bottom: 10px" height="250px" src="${item.img}"></div>`)
        );
        response.send(
            `<h1 style="text-align: center">Todos los productos:</h1><section style="display: flex; justify-content: space-around">${contenedor}</section>`
        );
    };
    ejecutar();
});

app.get('/random', (request, response) => {
    const ejecutar = async () => {
        const arrayProductos = await productos.getAll();
        let numero = Math.floor(Math.random() * arrayProductos.length);                                                                                                                                                                                                                                         
        const producto = await productos.getById(numero + 1);
        let contenedor = `<div style="background-color: RebeccaPurple; color: white; text-align: center; height: auto; width: 300px"><h2>Artista: ${producto[0].nombre}</h2> <h3>Precio: $ ${producto[0].precio}</h3> <img style="margin-bottom: 10px"height="250px" src="${producto[0].img}"></div>`;
        response.send(
            `<h1 style="text-align: center">Producto al azar:</h1><section style="display: flex; justify-content: space-around">${contenedor}</section>`
        );
    };
    ejecutar();
});

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});

server.on("error", error => console.log(`Error en servidor: ${error.message}`));