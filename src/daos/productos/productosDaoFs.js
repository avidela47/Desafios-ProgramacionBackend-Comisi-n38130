import { Contenedor } from '../../contenedor/contenedorFs.js';

class ProductosDaoFs extends Contenedor {

  constructor() {
    super('src/db/productos.json');
  }

}

export default ProductosDaoFs;