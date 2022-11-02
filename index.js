const { Router } = require('express');
const productos = require("./routers.js");

const app = Router();

app.use("/productos", productos);

module.exports = app;