import { Contenedor } from '../../contenedor/contenedorFs.js';

class CarritosDaoFs extends Contenedor {

  constructor() {
    super('src/db/carritos.json');
  }

}

export default CarritosDaoFs;