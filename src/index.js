const express = require('express');
const path = require('path');
const http = require('http');
const io = require('socket.io');
const moment = require('moment');

const port = 8080;
// const router = require('./routes/index');
const productos = require('./controller/productos');
const registroChat = require('./controller/chat');

const app = express();
const myServer = http.Server(app);

myServer.listen(port,()=>{
    console.log('Server up, listening at port ',port);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine','pug');
const viewsPath = path.resolve(__dirname,'../views');
app.set('views',viewsPath);

app.get('/',(req,res)=>{
    const Productos = productos.getAll();
    const regChat = registroChat.getAll();
    const contenido = {productos:Productos, registroChat:regChat};
    console.log(contenido);
    res.render('index', { contenido })
});

// app.use('/api',router);

const myWSServer = io(myServer);

myWSServer.on('connection',(socket)=>{
    console.log('Un cliente se ha conectado');

    // const regChat = registroChat.getAll();
    // socket.emit('cargarRegistroChat',regChat)


    socket.on('mensajeChat',(data)=>{
        const date = new Date();
        data.fecha = `[${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}]`;
        console.log(data);
        registroChat.save(data);
        myWSServer.emit('ShowMsg', data);
    })

});

app.post('/api/productos', async (req,res)=>{
    const body = req.body;
    console.log(body);
    body.precio=parseInt(body.precio)
    if (!body.nombre || !body.precio || !body.thumbnail || typeof body.nombre != 'string' || isNaN(body.precio) || typeof body.thumbnail != 'string'){
        return res.status(400).json({
            error: 'Debes ingresar un nombre(string), precio(number) y thumbnail(string) para el producto'
        });
    }

    const producto = {
        nombre: body.nombre,
        precio: body.precio,
        thumbnail: body.thumbnail
    }

    await productos.save(producto);
    myWSServer.emit('cargarProducto', producto);
    res.redirect('/')
});

