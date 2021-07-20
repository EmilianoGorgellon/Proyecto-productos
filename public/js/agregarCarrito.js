const buttonShop = document.querySelectorAll(".button--shop");
const carritoCantidad = document.getElementById("cantidad--carrito");
const productoShop = [];
// Header (menu de navegacion)
const buttonBar = document.getElementById("buttonBar");
const menu = document.getElementById("menu");
const iconBuscador = document.getElementById("iconBuscador");
let cantidadProductos = 0;

buttonBar.addEventListener('click', () => {
    menu.classList.toggle("menu-show")
})

iconBuscador.addEventListener('click', () => {
    const valorBusqueda = document.formu.busqueda.value;
    if (/^[a-zA-Z0-9\.]+$/.test(valorBusqueda)){
        document.formu.submit();
    } else {
        alert("NO cumple con los criterios de busqueda")
    }
})

// agregar producto al carrito
if (localStorage.getItem("carrito") !== null) {
    cantidadProductos = localStorage.getItem("cantidad")
    const jsonProductosLocal = localStorage.getItem("carrito");
    const arrayProductoShop = JSON.parse(jsonProductosLocal);
    arrayProductoShop.productos.map((dato) => productoShop.push(dato));
    carritoCantidad.classList.add("cantidad--carrito");
    carritoCantidad.innerText = `${cantidadProductos}`
}

const agregarProductoCarrito = (e) => {
    e.preventDefault()
    const card = e.target.closest(".product-link");
    const title = card.querySelector(".product-name").textContent;
    const precio = card.querySelector(".product-price span").textContent;
    const imagen = card.querySelector(".product-img").src;
    const imagenAlt = card.querySelector(".product-img").alt;
    let objeto =
        {   
            "titulo": title, 
            "precio": precio,
            "imagen": imagen,
            "alt": imagenAlt
        }
    let objetos2 = JSON.stringify(objeto)
    productoShop.push(objetos2)
    let productoJSON = JSON.stringify({"productos": productoShop})
    localStorage.setItem("carrito", productoJSON);
    cantidadProductos ++;
    localStorage.setItem("cantidad", cantidadProductos);
    carritoCantidad.classList.add("cantidad--carrito");
    carritoCantidad.innerText = `${cantidadProductos}`
}

buttonShop.forEach((buttonCarrito) => {
    buttonCarrito.addEventListener('click', agregarProductoCarrito)
})