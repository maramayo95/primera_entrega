const moment = require("moment");
const fs = require("fs").promises;

class Productos {
  constructor() {
    (this.productos = []), (this.ruta = "./src/db/productos.txt"),(this.id = 1);
  }

async  traerProductos() {
    try {
      const dataFs = await fs.readFile(this.ruta, "utf-8");
        if(dataFs.toString() != ''){
          this.productos = JSON.parse(dataFs)
          //this.id = this.productos[this.productos.length -1].id +1
          if(this.productos.length > 0){
            this.id = parseInt(this.productos[this.productos.length -1].id) +1
          }else {
            this.id = 1
          }
        }
        return this.productos
    } catch (e) {
      if( e.code == "ENOENT"){
        fs.writeFile(this.ruta,'')
        return []
    }
    
  }
}
  
  async traerProducto(id) {
    const traerP = await this.traerProductos()
    const producto = this.productos.find((prod) => prod.id == id);

    return producto;
  }
  async guardarProducto(data) {
    //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.
    //const dataFs = await fs.readFile(this.ruta, "utf-8");
      //let nuevoId = 1;
    try {
      const dataProductos = await this.traerProductos() 
      console.log(dataProductos);
      const nuevoProducto = {
        id: this.id,
        timestamp: moment().format("L LTS"),
        nombre: data.nombre,
        descripcion: data.descripcion,
        codigo: data.codigo,
        foto: data.foto,
        precio: data.precio,
        stock: data.stock,
      };
      dataProductos.push(nuevoProducto);
      //console.log(dataProductos);
      await fs.writeFile(this.ruta, JSON.stringify(dataProductos, null, 2));
  
    } catch (e) {
        console.log(e)
    }
   // return nuevoProducto;
  }
  async eliminarProducto(id) {
    try {
      const productosGuardados = await this.traerProductos()
      // const listaProd = this.productos 
       const nuevaLista = productosGuardados.filter(prod => prod.id !== parseInt(id));
       if(id >= 0){
         await fs.writeFile(this.ruta, JSON.stringify(nuevaLista, null, 2));
         return nuevaLista;
       }

    } catch (e){
      console.log(e)
    }
  
  }
  async actualizarProducto(data,id) {
    try {
      const productosGuardados = await this.traerProductos()
      const actualizarDataProducto = {
          id: parseInt(id),
          timestamp: moment().format("L LTS"),
          nombre: data.nombre,
          descripcion: data.descripcion,
          codigo: data.codigo,
          foto: data.foto,
          precio: data.precio,
          stock: data.stock,
      }
      const actualizarI = productosGuardados.findIndex((prod) => prod.id === parseInt(id))
      productosGuardados[actualizarI] = actualizarDataProducto
      await fs.writeFile(this.ruta, JSON.stringify(productosGuardados ,null, 2))
      return actualizarDataProducto;
    } catch(error){
        console.log("Error: No se ha podido actualizar el producto " + error)
    }
  }
}

module.exports = Productos;
