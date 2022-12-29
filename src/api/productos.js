import options from '../connection/options.js'

import ContenedorArchivo from '../contenedor/ContenedorArchivo.js'

const productosApi = new ContenedorArchivo(`${options.fileSystem.path}/productos.json`)

export default productosApi