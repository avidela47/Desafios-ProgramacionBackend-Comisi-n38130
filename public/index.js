const socket = io();

// Productos
function renderProducto(producto) {
    const linea = document.createElement('tr');
    linea.style.setProperty('background-color', 'rgba(0, 0, 0, 0.2');


    //Nombre
    const nombre = document.createElement('td');
    nombre.innerHTML = producto.nombre;
    nombre.style.setProperty('font-size', '17px');
    linea.appendChild(nombre);

    //Precio
    const precio = document.createElement('td');
    precio.innerHTML = producto.precio;
    precio.style.setProperty('font-size', '17px');
    linea.appendChild(precio);

    //Imagen
    const portada = document.createElement('td');
    const img = document.createElement('img');
    img.setAttribute("src", producto.img);
    img.setAttribute("width", "100");

    portada.appendChild(img);
    linea.appendChild(portada);

    document.getElementById('productos').appendChild(linea);
}

socket.on('nueva-conexion', data => {
    data.forEach(producto => {
        renderProducto(producto);
    });
});

socket.on('producto', data => {
    renderProducto(data);
});

function addProduct(e) {
    const producto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        img: document.getElementById('img').value
    };
    socket.emit('new-product', producto);
    return false;
}

// Mensajes

const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        autor: {
            email: document.getElementById('inputEmail').value,
            nombre: document.getElementById('inputNombre').value,
            apellido: document.getElementById('inputApellido').value,
            edad: document.getElementById('inputEdad').value,
            alias: document.getElementById('inputAlias').value,
            avatar: document.getElementById('inputAvatar').value,
        },
        texto: document.getElementById('inputMensaje').value
    }
    socket.emit('new-message', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()


    socket.on('mensajes', mensajes => {

        const tamanioNormalizado = JSON.stringify(mensajes).length;

        const mensajesDesnormalizados = normalize.denormalize(mensajes.result, mensajesSchema, mensajes.entities);

        const tamanioDesnormalizado = JSON.stringify(mensajesDesnormalizados).length;

        const porcentaje = parseInt((tamanioNormalizado * 100) / tamanioDesnormalizado);
        document.getElementById("compresion").innerText = porcentaje || 0;
        // console.log(porcentaje);
        const html = makeHtmlList(mensajesDesnormalizados?.mensajes)
        document.getElementById('mensajes').innerHTML = html;
    })

    function makeHtmlList(mensajes) {
        return mensajes.map(mensaje => {
            return (`
            <div>
                <b style="color:blue;">${mensaje.autor.email}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
        }).join(" ");
    }

    inputEmail.addEventListener('input', () => {
        const hayEmail = inputEmail.value.length
        const hayTexto = inputMensaje.value.length
        inputMensaje.disabled = !hayEmail
        btnEnviar.disabled = !hayEmail || !hayTexto
    })

    inputMensaje.addEventListener('input', () => {
        const hayTexto = inputMensaje.value.length
        btnEnviar.disabled = !hayTexto
    })
})