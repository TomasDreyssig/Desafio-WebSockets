const socket = io.connect();
 
const form = document.getElementById('formChat');
const email = document.getElementById('email');
const mensaje = document.getElementById('mensaje');
form.addEventListener('submit', (env)=>{
    env.preventDefault();

    const msg = {
        email: email.value,
        contenido: mensaje.value
    }

    mensaje.value ='';

    socket.emit('mensajeChat', msg);
    console.log(msg)
});

socket.on('ShowMsg',(data)=>{
    const msg = document.createElement('div');
    msg.innerHTML= `<p class="correo">${data.email}</p> <p class="fecha">${data.fecha}</p> <p class="mensaje">${data.contenido}</p>`;
    const chat = document.getElementById('registroMensajes');
    chat.appendChild(msg);
    //msg.scrollIntoView()
    msg.scrollIntoView({behavior:"smooth"})
});

socket.on('cargarProducto',(data)=>{
    const producto = document.createElement('tr');
    const pID = document.createElement('td');
    pID.innerHTML = data.ID;
    const pNombre = document.createElement('td');
    pNombre.innerHTML = data.nombre;
    const pPrecio = document.createElement('td');
    pPrecio.innerHTML = data.precio;
    const pThumbnail = document.createElement('td');
    const imag = document.createElement('img');
    imag.setAttribute('src',data.thumbnail);
    imag.setAttribute('width','40px')
    pThumbnail.appendChild(imag);
    producto.appendChild(pID);
    producto.appendChild(pNombre);
    producto.appendChild(pPrecio);
    producto.appendChild(pThumbnail);
    const tabla = document.getElementById('tabla');
    tabla.appendChild(producto);
});