// const socket = io();

// // Productos
// function renderProducto(producto) {
//     const linea = document.createElement('tr');
//     linea.style.setProperty('background-color', 'rgba(0, 0, 0, 0.2');


//     //Nombre
//     const nombre = document.createElement('td');
//     nombre.innerHTML = producto.nombre;
//     nombre.style.setProperty('font-size', '17px');
//     linea.appendChild(nombre);

//     //Precio
//     const precio = document.createElement('td');
//     precio.innerHTML = producto.precio;
//     precio.style.setProperty('font-size', '17px');
//     linea.appendChild(precio);

//     //Imagen
//     const portada = document.createElement('td');
//     const img = document.createElement('img');
//     img.setAttribute("src", producto.img);
//     img.setAttribute("width", "100");

//     portada.appendChild(img);
//     linea.appendChild(portada);

//     document.getElementById('productos').appendChild(linea);
// }

// socket.on('nueva-conexion', data => {
//     data.forEach(producto => {
//         renderProducto(producto);
//     });
// });

// socket.on('producto', data => {
//     renderProducto(data);
// });

// function addProduct(e) {
//     const producto = {
//         nombre: document.getElementById('nombre').value,
//         precio: document.getElementById('precio').value,
//         img: document.getElementById('img').value
//     };
//     socket.emit('new-product', producto);
//     return false;
// }

// // Mensajes

// /* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// // Definimos un esquema de autor
// const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });

// // Definimos un esquema de mensaje
// const schemaMensaje = new normalizr.schema.Entity('post', { author: schemaAuthor }, { idAttribute: '_id' })

// // Definimos un esquema de posts
// const schemaMensajes = new normalizr.schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })
// /* ----------------------------------------------------------------------------- */

// const inputUsername = document.getElementById('username')
// const inputMensaje = document.getElementById('inputMensaje')
// const btnEnviar = document.getElementById('btnEnviar')

// const formPublicarMensaje = document.getElementById('formPublicarMensaje')
// formPublicarMensaje.addEventListener('submit', e => {
//     e.preventDefault()

//     const mensaje = {
//         author: {
//             email: inputUsername.value,
//             nombre: document.getElementById('nombre').value,
//             apellido: document.getElementById('apellido').value,
//             edad: document.getElementById('edad').value,
//             alias: document.getElementById('alias').value,
//             avatar: document.getElementById('avatar').value
//         },
//         text: inputMensaje.value
//     }

//     socket.emit('nuevoMensaje', mensaje);
//     formPublicarMensaje.reset()
//     inputMensaje.focus()
// })

// socket.on('mensajes', mensajesN => {

//     const mensajesNsize = JSON.stringify(mensajesN).length
//     console.log(mensajesN, mensajesNsize);

//     const mensajesD = normalizr.denormalize(mensajesN.result, schemaMensajes, mensajesN.entities)

//     const mensajesDsize = JSON.stringify(mensajesD).length
//     console.log(mensajesD, mensajesDsize);

//     const porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize)
//     console.log(`Porcentaje de compresión ${porcentajeC}%`)
//     document.getElementById('compresion-info').innerText = porcentajeC

//     console.log(mensajesD.mensajes);
//     const html = makeHtmlList(mensajesD.mensajes)
//     document.getElementById('mensajes').innerHTML = html;
// })

// function makeHtmlList(mensajes) {
//     return mensajes.map(mensaje => {
//         return (`
//         <div>
//             <b style="color:blue;">${mensaje.author.email}</b>
//             [<span style="color:brown;">${mensaje.fyh}</span>] :
//             <i style="color:green;">${mensaje.text}</i>
//             <img width="50" src="${mensaje.author.avatar}" alt=" ">
//         </div>
//     `)
//     }).join(" ");
// }

// inputUsername.addEventListener('input', () => {
//     const hayEmail = inputUsername.value.length
//     const hayTexto = inputMensaje.value.length
//     inputMensaje.disabled = !hayEmail
//     btnEnviar.disabled = !hayEmail || !hayTexto
// })

// inputMensaje.addEventListener('input', () => {
//     const hayTexto = inputMensaje.value.length
//     btnEnviar.disabled = !hayTexto
// })