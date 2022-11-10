class Contenedor {
    constructor(productos) {
        this.productos = productos;
    }


  save(producto) {

    if (producto.id) {
      this.productos.push(producto);
      return producto.id;
    }

    let id = 1;
    this.productos.forEach((producto, index) => {
      if (producto.id >= id) {
        id = producto.id + 1;
      }
    });
    producto.id = id;
    this.productos.push(producto);
    return id;
  }

  getById(id) {
    let objetoSeleccionado = null;
    this.productos.forEach(producto => {
      if (producto.id == id) {
        objetoSeleccionado = producto;
      }
    });
    return objetoSeleccionado;
  }

  update(producto) {
    this.productos = this.productos.map((producto) => {
      if (producto.id == producto.id) {
        return producto;
      }
      return producto;
    });
  }

  getAll() {
    return this.productos;
  }

  deleteById(id) {
    let indexSeleccionado = -1;
    this.productos.forEach((producto, index) => {
      if (producto.id == id) {
        indexSeleccionado = index;
      }
    });
    if (indexSeleccionado != -1) {
      this.productos.splice(indexSeleccionado, 1);
    }
    
  }

  deleteAll() {
    this.productos = [];
  }
}

module.exports = Contenedor;













