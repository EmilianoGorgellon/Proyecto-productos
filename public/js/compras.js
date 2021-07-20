const listaCarrito = document.getElementById("lista-carrito");
const cuentaTotal = document.getElementById("cuenta-total");
const carritoCantidad = document.getElementById("cantidad--carrito");
// Header (menu de navegacion)
const buttonBar = document.getElementById("buttonBar");
const menu = document.getElementById("menu");
const iconBuscador = document.getElementById("iconBuscador");

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

window.addEventListener("load", () => {
    const actualizarPrecio = () => {
        productosPrecios = document.querySelectorAll(".producto--carrito-precio span");
        precioProductos = 0;
        productosPrecios.forEach((precio) => {
            precioProductos += parseInt(precio.textContent);
        })
        const precioTotal = document.getElementById("precioTotal");
        let sumaTotal = 0;
        if (pagoContado.checked === true) {
            sumaTotal = (precioProductos * 1).toFixed(2);
        } else {
            sumaTotal = (precioProductos * 1.20).toFixed(2);
        }
        precioTotal.innerHTML = `Total: $ ${sumaTotal}`;
    }

    let cantidadProductos = localStorage.getItem("cantidad");
    cantidadProductos !== null ? (
        carritoCantidad.classList.add("cantidad--carrito"),
        carritoCantidad.innerText = `${cantidadProductos}`
    ) : (
        carritoCantidad.classList.remove("cantidad--carrito"),
        carritoCantidad.innerText = ""
    )

    const obtengoProductosShop = localStorage.getItem("carrito");
    const despejoProductos = JSON.parse(obtengoProductosShop);
   
    despejoProductos.productos.map((dato) => {
        const obtengoDatos = JSON.parse(dato);
        listaCarrito.insertAdjacentHTML('afterbegin' , 
        `
            <article class="container--producto-carrito">
                <img class="producto--carrito-img" src="${obtengoDatos.imagen}" alt="${obtengoDatos.imagenAlt}" />
                <h3 class="producto--carrito-titulo">${obtengoDatos.titulo}</h3>
                <p class="producto--carrito-precio">$<span>${obtengoDatos.precio}</span></p>
                <i class="fas fa-trash-alt icon-basura"></i>
            <article>
        `)
    })
    // Actualizacion de precios
    let productosPrecios = document.querySelectorAll(".producto--carrito-precio span");
    let precioProductos = 0;
    productosPrecios.forEach((precio) => {
        precioProductos += parseInt(precio.textContent);
    })

    cuentaTotal.insertAdjacentHTML('afterbegin', 
    `   <div class="container--metodos-pagos">
            <div class="container--pagos">
                <input class="radio--pago" type="radio" id="pago-contado" name="pago" checked>
                <label class="label--pago" for="pago-contado">Pago contado <br>(deposito, transferencias)</label>
            </div>
            <div class="container--pagos">
                <input class="radio--pago" type="radio" id="pago-tarjeta" name="pago">
                <label class="label--pago" for="pago-tarjeta">Pago en cuotas <br>(tarjeta, Mercado Pago)</label>
            </div>
        </div>
        <p class="precio--total" id="precioTotal">Total: $ ${precioProductos}</p>
    `)
  
    
    const pagoContado = document.getElementById("pago-contado");
    const pagoTarjeta = document.getElementById("pago-tarjeta");
    pagoContado.addEventListener('change', actualizarPrecio)
    pagoTarjeta.addEventListener('change', actualizarPrecio)
   
    // Eliminar productos del carrito
    const basuraIcons = document.querySelectorAll(".icon-basura");
    basuraIcons.forEach((basuraIcon) => {
        basuraIcon.addEventListener('click', (e) => {
            e.target.closest(".container--producto-carrito").remove();
            const obtengoProductos = document.querySelectorAll(".container--producto-carrito"); 
            
            if (obtengoProductos.length > 0) {
                const ActualizoListaProductos = [];
                cantidadProductos --;
                localStorage.setItem("cantidad", cantidadProductos);
                carritoCantidad.classList.add("cantidad--carrito");
                carritoCantidad.innerText = `${cantidadProductos}`;
                obtengoProductos.forEach((product) => { 
                    const productImage = product.querySelector(".producto--carrito-img").src;
                    const productAlt = product.querySelector(".producto--carrito-img").alt;
                    const productTitle = product.querySelector(".producto--carrito-titulo").textContent;
                    const productPrice = product.querySelector(".producto--carrito-precio span").textContent;
                    const objeto = {
                        "titulo": productTitle, 
                        "precio": productPrice,
                        "imagen": productImage,
                        "alt": productAlt
                    }
                    const objetoJSON = JSON.stringify(objeto);
                    ActualizoListaProductos.push(objetoJSON);
                    const listaProductosJSON = JSON.stringify({"productos": ActualizoListaProductos})
                    localStorage.setItem("carrito", listaProductosJSON); 
                })
            } else {
                localStorage.removeItem("carrito")
                localStorage.removeItem("cantidad")
                carritoCantidad.classList.remove("cantidad--carrito");
                carritoCantidad.innerText = "";
            }
            actualizarPrecio()
        })
    })
    
})