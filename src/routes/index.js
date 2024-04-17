// const express = require('express');
// const router = express.Router();
// const productos = require('../controller/productos');


// router.post('/productos', async (req,res)=>{
//     const body = req.body;
//     console.log(body);
//     body.precio=parseInt(body.precio)
//     if (!body.nombre || !body.precio || !body.thumbnail || typeof body.nombre != 'string' || isNaN(body.precio) || typeof body.thumbnail != 'string'){
//         return res.status(400).json({
//             error: 'Debes ingresar un nombre(string), precio(number) y thumbnail(string) para el producto'
//         });
//     }

//     const producto = {
//         nombre: body.nombre,
//         precio: body.precio,
//         thumbnail: body.thumbnail
//     }

//     await productos.save(producto);
    
//     res.redirect('/')
// });

// module.exports = router