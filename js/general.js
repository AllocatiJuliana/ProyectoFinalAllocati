//Mediante un button pasar de modo claro a modo oscuro 
//Guardar en localStorage para que cuando se actualice la pagina siga quedando en el ultimo modo elegido


const cambiarModo = document.querySelector(".cambiarModo")
const body = document.querySelector(".modoClaro")



cambiarModo.onclick = () => {
    body.classList.toggle("modoOscuro")
    if (body.className === "modoClaro modoOscuro") {
        cambiarModo.textContent = "Modo Claro"
    } else {
        cambiarModo.textContent = "Modo Oscuro"
    }
    if (document.body.classList.contains("modoOscuro")) {
        localStorage.setItem("modo", "true");
    } else {
        localStorage.setItem("modo", "false");
    }
}

if (localStorage.getItem("modo") === "true") {
    document.body.classList.add("modoOscuro");
    cambiarModo.textContent = "Modo Claro"

} else {
    document.body.classList.remove("modoOscuro");
}


