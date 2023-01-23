let insertarCarrito = JSON.parse(localStorage.getItem("carrito"))
const cargarArticulos = JSON.parse(localStorage.getItem("articulos"))
const totalImpreso = document.querySelector(".total-container")
let precios = [0]

const carritoContainer = document.querySelector(".carritoContainer")

//Insertando productos agregados en carrito

function cargarProductos(array, contenedor) {
    contenedor.innerHTML = "";
    const carritoTotal = totalizarProductos(array)
    carritoTotal.forEach(item => {
        const productos = document.createElement("div")
        productos.classList = "objetos"
        productos.innerHTML = `
        <div class="container-img">
            <img src ="${item.img}" alt=${item.producto}>
        </div>
        <h2>
            ${item.producto}
        </h2>
        <p>$${item.precioTotal} (cantidad: ${item.cantidad})</p>
        <button id="boton-${item.id}" class="agregar">
            Eliminar del Carrito
        </button>
        `
        contenedor.append(productos)
    })
    actualizarPrecio(array)
}
cargarProductos(insertarCarrito, carritoContainer)

function totalizarProductos(array) {
    const carritoTotal = {};
    array.forEach(item => {
        if (carritoTotal[item.id]) {
            const itemCarrito = carritoTotal[item.id];
            itemCarrito.cantidad += 1;
            itemCarrito.precioTotal += item.precio;
        } else {
            carritoTotal[item.id] = item;
            const itemCarrito = carritoTotal[item.id];
            itemCarrito.cantidad = 1;
            itemCarrito.precioTotal = item.precio;
        }
    });
    return Object.values(carritoTotal);
}



//Eliminar productos del carrito

function eliminarDelCarrito(array) {
    const botonEliminar = document.querySelectorAll(".agregar")
    botonEliminar.forEach(eliminar => {
        eliminar.onclick = () => {
            const id = eliminar.id.slice(6)
            const index = insertarCarrito.findIndex(p => p.id == id);
            insertarCarrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(insertarCarrito))
            cargarProductos(insertarCarrito, carritoContainer)
            eliminarDelCarrito(insertarCarrito)
        }
    })
}

//Suma de precios de los articulos agregados al carrito

function actualizarPrecio(array) {
    precios = []
    totalImpreso.innerHTML = ""
    array.forEach(item => {
        precios.push(item.precio)
    })
    let total = precios.reduce((a, b) => a + b)
    totalImpreso.textContent = "$" + total
}

eliminarDelCarrito(insertarCarrito)


//Eliminar todos los productos


const borrarTodo = document.querySelector(".borrarCarrito")


borrarTodo.onclick = () => {
    localStorage.removeItem("carrito")
    document.querySelector(".carritoContainer").innerHTML = "CARRITO VACIO"
    totalImpreso.innerHTML = ""
}

//Cartel de compra realizada desde libreria 

const compraRealizada = document.querySelector(".comprar")

compraRealizada.onclick = () => {
    localStorage.removeItem("carrito")
    document.querySelector(".carritoContainer").innerHTML = "CARRITO VACIO"
    totalImpreso.innerHTML = ""
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Muchas gracias por su compra',
        showConfirmButton: false,
        timer: 1500
    })
}





