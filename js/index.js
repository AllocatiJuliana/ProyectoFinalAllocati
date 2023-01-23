//Insertar articulos en HTML desde JSON

let articulos = []

fetch("articulos.json")
    .then(res => res.json())
    .then(data => {
        articulos = data
        localStorage.setItem("articulos", JSON.stringify(articulos))
        const contenedor = document.querySelector(".container")
        cargarProductos(articulos, contenedor)
        agregarAlCarrito()
        agregarAlCarrito(articulos)
    })



function cargarProductos(array, contenedor) {
    contenedor.innerHTML = ""
    array.forEach(item => {
        const productos = document.createElement("div")
        productos.classList = "objetos"
        productos.innerHTML = `
        <div class="container-img">
            <img src ="${item.img}" alt=${item.producto}>
        </div>
        <h2>
            ${item.producto}
        </h2>
        <p>$${item.precio}</p>
        <button id="boton-${item.id}" class="agregar">
            Agregar al Carrito
        </button>
        `
        contenedor.append(productos)
    })
}

//Mediante boton ordenar alfabeticamente 

const ordenar = document.querySelector(".ordenar")

const contenedor = document.querySelector(".container")

ordenar.onclick = () => {
    let arrayOrdenado = articulos.sort((a, b) => {
        if (a.producto < b.producto) {
            return -1
        } else if (a.producto > b.producto) {
            return 1
        } else {
            return 0
        }
    })


    cargarProductos(arrayOrdenado, contenedor)
    actualizarBotones()
}


//Mediante boton mostrar solo productos en oferta

const ofertas = document.querySelector(".ofertas")

ofertas.onclick = () => {
    let arrayOferta = articulos.filter(articulos => articulos.oferta == true);

    cargarProductos(arrayOferta, contenedor)
    actualizarBotones()

}

//Agregar articulos al carrito

let carrito = []

function agregarAlCarrito(array) {
    const botonAgregar = document.querySelectorAll(".agregar")
    botonAgregar.forEach(agregar => {
        agregar.onclick = () => {
            const id = agregar.id.slice(6)
            const filtrar = array.find((elemento) => {
                return elemento.id === Number(id)
            })
            carrito.push(filtrar)
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }
    })

}

agregarAlCarrito(articulos)

const articulosAgregados = JSON.parse(localStorage.getItem("carrito"))
carrito = articulosAgregados || []

//Actualice los botones para que cuando ordene alfabeticamente o vea ofertas se puedan agregar tambien desde ese apartado al carrito.

function actualizarBotones() {
    let botonAgregar = document.querySelectorAll(".agregar")
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito(articulos));
    })

}

