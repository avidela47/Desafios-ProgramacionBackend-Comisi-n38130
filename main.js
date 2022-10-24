const express = require('express');
const Contenedor = require("./contenedor");
const productos = new Contenedor("./productos.json");

const app = express();

const PORT = 8080;

app.get('/', (request, response) => {
    response.send(
        `<body style="background-image: url(https://static1.elcomercio.es/www/pre2017/multimedia/RC/201704/25/media/cortadas/industria-discografica-krEG-U213724905522SxF-660x371@RC.jpg); background-size: cover;"></body>
        <h1 style="text-align: center; color:white">Hola Natalia bienvenida a:<br/></h1>
        <h2 style="text-align: center; color:white">Mi tercer desafio</h2> `
    );
});

app.get('/productos', async(request, response) => {
    
        const arrayProductos = await productos.getAll();
        let contenedor = ``;
        arrayProductos.map(
            item =>
                (contenedor += `<body style="background-image: url(https://static1.elcomercio.es/www/pre2017/multimedia/RC/201704/25/media/cortadas/industria-discografica-krEG-U213724905522SxF-660x371@RC.jpg); background-size: cover; color:white"></body>
                                <div style="background-image: url(https://aptus.com.ar/wp-content/uploads/2018/10/vinyl-playing-1920x1080.jpg); color: white; text-align: center; height: auto; width: 300px"><h2>Artista: ${item.nombre}</h2><h3>Album: ${item.album}</h3><h4>Año: ${item.año}</h4><img style="margin-bottom: 10px" height="250px" width="250px" src="${item.img}"><h3>Precio: $ ${item.precio}</h3></div>`)
        );
        response.send(
            `<h1 style="text-align: center">Todos los productos:</h1><section style="display: flex; justify-content: space-around">${contenedor}</section>`
        );
});

app.get('/random', async(request, response) => {
    
        const arrayProductos = await productos.getAll();
        let numero = Math.floor(Math.random() * arrayProductos.length);                                                                                                                                                                                                                                         
        const producto = await productos.getById(numero + 1);
        let contenedor = `<body style="background-image: url(https://static1.elcomercio.es/www/pre2017/multimedia/RC/201704/25/media/cortadas/industria-discografica-krEG-U213724905522SxF-660x371@RC.jpg); background-size: cover; color:white"></body>
                          <div style=" background-image: url(https://aptus.com.ar/wp-content/uploads/2018/10/vinyl-playing-1920x1080.jpg); color: white; text-align: center; height: auto; width: 300px"><h2>Artista: ${producto[0].nombre}</h2><h3>Album: ${producto[0].album}</h3><h4>Año: ${producto[0].año}</h4><img style="margin-bottom: 10px"height="250px" src="${producto[0].img}"><h3>Precio: $ ${producto[0].precio}</h3></div>`;
        response.send(
            `<h1 style="text-align: center">Producto al azar:</h1><section style="display: flex; justify-content: space-around">${contenedor}</section>`
        );
});

const server = app.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
});

server.on("error", error => console.log(`Error en servidor: ${error.message}`));