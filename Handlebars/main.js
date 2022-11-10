const express = require('express');
const Contenedor = require("./contenedor");
const handlebars = require('express-handlebars');

const app = express();
const productos = new Contenedor([]);

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: __dirname + '/views'
}));

app.set('views', './views');
app.set('view engine', 'hbs');


app.get('/productos', (req, res) => {
    const totalProductos = productos.getAll();
    res.render('lista', {
      productos: totalProductos
    });
  });
  
  app.post('/productos', (req, res) => {
    const producto = req.body;
    productos.save(producto);
    res.render('formulario', {});
  });
  
  app.get('/', (req, res) => {
    res.render('formulario', {});
  });

  
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando: ${server.address().port}`);
  });
  
  server.on('error', error => console.log(`Error: ${error}`));