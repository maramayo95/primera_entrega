//Empieza a traer los importaciones de todo src
const express = require('express')
const app = express()


const productRoutes = require('./routes/productosRoutes');
const cartRoute = require('./routes/cartRoute');

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/productos', productRoutes)
app.use('/api/carrito', cartRoute)



module.exports = app