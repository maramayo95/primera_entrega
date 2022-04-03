//Empieza a traer los importaciones de todo src
const express = require('express')
const app = express()


const productRoutes = require('./routes/productosRoutes');
const cartRoute = require('./routes/cartRoute');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/productos', productRoutes)
app.use('/api/carrito', cartRoute)

app.all('*', (req, res) => {
    res.status(404).json({
        error: -1 , 
        descripcion: `Ruta: ${req.baseUrl} NO IMPLEMENTADA`
    })
  });

module.exports = app