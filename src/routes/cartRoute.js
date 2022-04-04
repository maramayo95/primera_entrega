const express = require('express')
const Carrito = require('../api/Carrito')
const Productos = require('../api/Productos')
const cartRoute = express.Router()

const nuevoContenedorCarrito = new Carrito()
const nuevoContenedorProducto = new Productos()

cartRoute.get('/:id/productos', async (req,res)=> {
    const id = req.params.id;
    const encontrarCarritoCompra = await nuevoContenedorCarrito.encontrarCarrito(id)

    res.status(200).json(encontrarCarritoCompra)
})

cartRoute.post('/', async (req,res)=> {
  const carritoNuevo =  await  nuevoContenedorCarrito.crearCarrito()
    res.status(201).json(carritoNuevo)
})
cartRoute.post('/:id/productos', async (req,res)=> {
    const id = req.params.id;
    const producto = await nuevoContenedorProducto.traerProducto(req.body.id)
    console.log(producto)
    const agregarProducto = await nuevoContenedorCarrito.agregarProductoEnCarrito(id, producto)

    res.status(201).json(agregarProducto)

})
cartRoute.delete('/:id', async (req,res)=> {
    // Borrar carrito por id 
    const id = req.params.id
    const eliminarCarrito = await nuevoContenedorCarrito.borrarCarrito(id)

    res.status(202).json(eliminarCarrito)
})
cartRoute.delete('/:idCarrito/productos/:idProducto', async (req,res)=> {
    const idCarrito = req.params.idCarrito
    const idProducto = req.params.idProducto

    const eliminarProducto = await nuevoContenedorCarrito.eliminarProductoEnCarrito(idCarrito, idProducto)
    
    res.status(202).json(eliminarProducto)
})

module.exports = cartRoute