const socket = io();

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
    data.forEach(producto =>{
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

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div style="color: brown; padding: 15px; background-color: rgba(0, 0, 0, 0.8">
            <strong style="color: blue">${elem.email}</strong> [${elem.time}] :
            <em style="color: green">${elem.texto}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });

function addMessage(e) {
    const mensaje = {
        email: document.getElementById('email').value,
        texto: document.getElementById('texto').value
    };
    if (mensaje.email) {
        socket.emit('new-message', mensaje);
    } else {
        alert('Ingrese su email');
    }    
    return false;
}