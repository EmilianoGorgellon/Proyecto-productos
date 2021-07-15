// Header (menu de navegacion)
const buttonBar = document.getElementById("buttonBar");
const menu = document.getElementById("menu");
const carritoCantidad = document.getElementById("cantidad--carrito");
buttonBar.addEventListener('click', () => {
    menu.classList.toggle("menu-show")
})
const cantidadProductos = localStorage.getItem("cantidad");
cantidadProductos !== null ? (
    carritoCantidad.classList.add("cantidad--carrito"),
    carritoCantidad.innerText = `${cantidadProductos}`
) : (
    carritoCantidad.classList.remove("cantidad--carrito"),
    carritoCantidad.innerText = ""
)