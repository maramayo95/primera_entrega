const express = require('express')
const productRoutes = express.Router()
const isAdmin = require('../middleware/isAdmin')
const Productos = require('../api/Productos')
const prodTienda = new Productos()

const rolAdmin = true;


productRoutes.get('/', (req,res)=> {
    const productos = prodTienda.traerProductos()
    res.status(200).json(productos)
})
productRoutes.get('/:id', (req,res)=> {
    const id = req.params.id
    const producto = prodTienda.traerProducto(id)
    if(producto) {
        res.status(200).json(producto)
    } else {
        res.status(404).json({error: 'Producto no encontrado kpa'})
    }
})
productRoutes.post('/',isAdmin(rolAdmin), (req,res)=> {
    const productoNuevo = prodTienda.guardarProducto(req.body)
    res.status(201).json(productoNuevo)
    
})
productRoutes.put('/',isAdmin(rolAdmin), (req,res)=> {
    res.status(200).json({
        data : 'data',
        status: '200'
    })
})
productRoutes.delete('/', isAdmin(rolAdmin), (req,res)=> {
    res.status(200).json({
        data : 'data',
        status: '200'
    })
})

module.exports = productRoutes