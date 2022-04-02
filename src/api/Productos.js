const moment = require("moment")
const fs = require('fs').promises

class Productos {
    constructor(){
        this.productos = [],
        this.ruta = './src/db/productos.json'
    }

    traerProductos(){
        return this.productos
    }
    traerProducto(id){
        const producto = this.productos.find(prod => prod.id == id)

        return producto
    }
    async guardarProducto(data){
        //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
        const dataFs = await fs.readFile(this.ruta,'utf-8')
        let nuevoId = 1 ;
        if (dataFs) {
            const dataProductos = JSON.parse(dataFs)
            nuevoId = (dataProductos[(dataProductos.length)-1].id)+1
        } 
        const nuevoProducto = {
            id: nuevoId,
            timestamp: moment().format('L LTS'),
            nombre : data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio : data.precio,
            stock: data.stock
        }
        this.productos.push(nuevoProducto)
        console.log(this.productos)
        await fs.writeFile(this.ruta,JSON.stringify(this.productos, null, 2))
        return nuevoProducto
    }
}

module.exports = Productos