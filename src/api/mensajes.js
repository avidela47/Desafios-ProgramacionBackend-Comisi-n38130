import options from '../connection/options.js'

import ContenedorArchivo from '../contenedor/ContenedorArchivo.js'

const mensajesApi = new ContenedorArchivo(`${options.fileSystem.path}/mensajes.json`)

export default mensajesApi