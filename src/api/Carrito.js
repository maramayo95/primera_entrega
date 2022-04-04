const moment = require("moment");
const fs = require("fs").promises;

class Carrito {
    constructor(){
        this.carrito = [],
        this.ruta = "./src/db/carrito.txt",
        this.id = 1
    }

    async traerTodosLosCarritos() {
        try{
            const listaCarrito = await fs.readFile(this.ruta)
            if(listaCarrito.toString() != ''){
                this.carrito = JSON.parse(listaCarrito)
                this.id = this.carrito[this.carrito.length -1].id +1
            }
            return this.carrito
        }catch(error){
            if( error.code == "ENOENT"){
                 fs.writeFile(this.ruta,'')
                 return []
            }
            console.log("Error: No se ha podido escribir el archivo " + error)
        }
    }
    async crearCarrito(){
        try{
            const carritoCargado = await this.traerTodosLosCarritos()
            const nuevoCarrito = {
                id: this.id, 
                timestamp: moment().format('L LTS'),
                productos: []
            }
            carritoCargado.push(nuevoCarrito)
            await fs.writeFile(this.ruta, JSON.stringify(carritoCargado ,null, 2))
            return nuevoCarrito
        }catch(error){
            console.log("Error " + error)
        }
    }
    async borrarCarrito(id){
        // try {
            const carritoCargado = await this.traerTodosLosCarritos()
            const borradoI = carritoCargado.findIndex((cart) => cart.id === parseInt(id))

            if (borradoI === -1 ){
                return -1
            } else{
                const borrarCarritos = carritoCargado.splice(borradoI,1)
                await fs.writeFile(this.ruta, JSON.stringify(carritoCargado ,null, 2))
                return borrarCarritos
            }
        // }catch (error) {
        //     console.log("Error " + error)
        // } 
    }
    async encontrarCarrito(id) {
        try {
            const traerCarritos = await this.traerTodosLosCarritos()
            const carritoId = traerCarritos.find(cart => cart.id == parseInt(id))
            return carritoId.productos //de donde sale 
        }catch (error) {
            console.log("Error " + error)
        }
    }
    async agregarProductoEnCarrito(id, producto) {
        try {
            const traerCarritos = await this.traerTodosLosCarritos()
            const carritoId = traerCarritos.find(cart => cart.id == parseInt(id))
            if (carritoId) {
                carritoId.productos.push(producto)
                await fs.writeFile(this.ruta, JSON.stringify(traerCarritos ,null, 2))
                return carritoId
            }else {
                throw new Error("No se encontró el carrito")
            }
            
        }catch (error) {
            throw new Error(error.message)
        }
    }
    async eliminarProductoEnCarrito(idCarrito, idProducto) {
        try{
            const carritoCargado = await this.traerTodosLosCarritos()
            const cartById = carritoCargado.find(cart => cart.id === parseInt(idCarrito))
            if(cartById){
                console.log(cartById)
                const indiceCarrito = carritoCargado.findIndex((cart) => cart.id === parseInt(idCarrito))
                const deleteI = cartById.productos.findIndex((prod) => prod.id === parseInt(idProducto))
                if (deleteI != -1 ){
                    cartById.productos.splice(deleteI,1) 
                    carritoCargado[indiceCarrito] = cartById
                    await fs.writeFile(this.ruta, JSON.stringify(carritoCargado ,null, 2))
                    return cartById
                }
            }else {
                throw new Error("No se encontró el carrito")
            }

        }catch (error) {
            throw new Error(error.message)
        }
    }

}

module.exports = Carrito