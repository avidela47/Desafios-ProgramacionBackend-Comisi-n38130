var admin = require("firebase-admin");

var serviceAccount = require("./clase20-14c17-firebase-adminsdk-z1vnb-099537ce01.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export class Contenedor {
    constructor(productos) {
        const db = admin.firestore();
        const productos = db.collection('ecommerce');
    }

    async save(productos) {
       let productos = await productos.add({});
      }
      async getById(id) {
       const productos = await productos.getById(id);
    }
    
      async getAll() {
        const productos = await productos.get();
        productos.forEach(producto => {
            console.log({ id: producto.id, ...producto.data() });
        });
      }
    
      async deleteById(id) {
        await productos.doc(producto.id).delete();
      }
      async deleteAll() {
        await productos.doc.delete();
      }
    }
    