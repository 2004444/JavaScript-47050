//Clase para los productos de la aplicacion
class Producto {
  constructor(id, nombre, precio, categoria, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}

class BaseDeDatos {
  constructor() {
    //Array para catalogo
    this.productos = [];
    //Cargar productos
    this.agregarRegistro(1, "Remera", 500, "Ropa", "ropa og 1.PNG");
    this.agregarRegistro(2, "Buzo", 700, "Ropa", "Buzo og .PNG");
    this.agregarRegistro(3, "Short", 300, "Ropa", "short epico.PNG");
  }

  //Metodo que crea el objeto producto y lo almacena en el Array
  agregarRegistro(id, nombre, precio, categoria, imagen) {
    const producto = new Producto(id, nombre, precio, categoria, imagen);
    this.productos.push(producto);
  }

  //Nos duvuelve el catalogo de productos
  traerRegistros() {
    return this.productos;
  }

  //Nos devuelve un producto segun el ID
  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }

  //Nos devuelve un array con las coincidencias que encuentre segun el nombre del producto
  registrosPorNombre(palabra) {
    return this.productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(palabra.toLowerCase())
    );
  }
}

//Elementos
const spanCantidadProductos = document.querySelector("#cantidadProductos");
const spanTotalCarrito = document.querySelector("#totalCarrito");
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
const inputBuscar = document.querySelector("#inputBuscar");

class Carrito{
  constructor(){
    const carritoStorage = localStorage.getItem("carrito");
    //Array donde van a estar los productos del carrito
    this.carrito = carritoStorage || [];
    this.total = 0; // Total de los precios de todos los productos
    this.cantidadProductos = 0; //La cantidad de productos que tenemos en el carrito  
  }
  
  //
  estaEnCarrito({ id }){
    return this.carrito.find((producto) => producto.id === productoEnCarrito.id);

  }

  agregar(producto){
    const productoEnCarrito = this.estaEnCarrito(producto);

    if (!productoEnCarrito) {
      this.carrito.push({ ...producto, cantidad: 1 })
    }else{
      productoEnCarrito.cantidad++;
    }
    localStorage.setItem("carrito", JSON.stringify(this.carrito))

    this.listar();
  }
  
  //Quitar elementos del carrito
  quitar(id){
    const indice = this.carrito.findIndex((producto) => producto.id === id);
    //Si la cantidad es mayor a 1, le resto la cantidad en 1
    if (this.carrito[indice].cantidad > 1){
      this.carrito[indice].cantidad--;
    }else{
    //Y sino, borramos del carrito el producto a quitar
     this.carrito.splice(indice, 1);
    }
    this.listar();
  }
  
  //Lista todos los productos del carrito
  listar(){
    this.total = 0;
    this.cantidadProductos = 0;
    divCarrito.innerHTML = "";

    for(const producto of this.carrito){
      divCarrito.innerHTML += `
      <div class="productosCarrito">
         <h2>${producto.nombre}</h2>
         <p>$${producto.precio}</p>
         <p>Cantidad: ${producto.precio}</p>
         <a href="#" class="btnQuitar" data-id="${producto.id}">Quitar del carrito</a>
       </div>
      `;
      //Actualizamos los totales
      this.total += producto.precio * producto.cantidad;
      this.cantidadProductos += producto.cantidad;
    }

    const botonesQuitar = document.querySelectorAll(".btnQuitar")

    for (const boton of botonesQuitar) { 
    boton.addEventListener("click" , (event) => {
      event.preventDefault();
      const idProducto = Number(boton.dataset.id);
      this.quitar(idProducto);
    });
   }

   spanCantidadProductos.innerText = this.cantidadProductos;
   spanTotalCarrito.innerText = this.total;
  }
}

//iniciamos la base de datos
const bd = new BaseDeDatos();

//Instanciamos la clase producto
const producto = new Producto()

//Instanciamos la clase carrito
const carrito = new Carrito();

cargarProductos(bd.traerRegistros());

function cargarProductos(productos){
  //Vaciamos div
  divProductos.innerHTML = "";

  for (const producto of productos){
    divProductos.innerHTML += `
      <div class="producto">
      <div class="card">
  <img src="img/${producto.imagen}" class="card-img-top" alt="...">

  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">${producto.precio}</p>
    <a href="#" class="btn btn-primary" data-id="${producto.id}">Añadir al carrito</a>
    <a href="#" class="btn btn-primary" data-id="${producto.id}">Quitar del carrito</a>
  </div>
</div>
    `; 
  }

  const botonesAgregar = document.querySelectorAll(".btnAgregar");

  for (const boton of botonesAgregar){
    boton.addEventListener("click" , (event) => {
     //Evita el comportamiento default de HTML
      event.preventDefault();
      //Guardo el dataset ID que esta en el HTML del boton Agregar al carrito
      const idProducto = +boton.dataset.id;
      //Uso el metodo de la base de datos para ubicar el producto segun el ID
      constproducto = bd.registroPorId(idProducto);
      //
      Carrito.agregar(producto);
    });
  }
}

//Buscador

inputBuscar.addEventListener("input", (event) => {
  event.preventDefault();
  const palabra = inputBuscar.value;
  const producto = bd.registrosPorNombre(palabra);
  cargarProductos(producto);
})

