import { Contenedor } from '../../contenedor/contenedorMongoDb.js';

class ProductosDaoMongoDb extends Contenedor {

  constructor() {
    super('productos', {
        nombre: {type: String, require:true},
        album: {type: String, require:true},
        año: {type: Number, require:true},
        precio: {type: Number, require:true},
        precio: {type: Number, require:true},
        foto: {type: String, require:true}
    });
  }
  
}

export default ProductosDaoMongoDb;