import mongoose from 'mongoose';
import config from '../config.js';

await mongoose.connect(config.mongodb.url);

export class Contenedor {
    constructor(nombrecollection, esquema) {
        this.collection = mongoose.model(nombrecollection, esquema);
    }

    async save(producto) {

        let doc = await this.collection.create(producto);
        doc.id = doc._id;
        return doc.id;
    }

    async getById(id) {
        const doc = await this.collection.findOne({ '_id': id });
        if (doc) {
            doc.id = doc._id;
            return doc;
        }
        return null;
    }

    async update(producto) {
        await this.collection.replaceOne({'_id': producto.id}, producto);
    }

    async getAll() {
        let docs = await this.collection.find({});
        docs = docs.map(item => {
            item.id = item._id;
            return item;
        });
        return docs;
    }

    async deleteById(id) {
        await this.collection.deleteOne({ '_id': id });
    }

     async deleteAll() {
        await this.collection.deleteMany({});
    }
}
