let expresionReg = {
    "buscador": /^[a-zA-Z0-9\.]+$/,
}
const buttonBar = document.getElementById("buttonBar");
const menu = document.getElementById("menu");

buttonBar.addEventListener('click', () => {
    menu.classList.toggle("menu-show")
})

const buscar = () => {
    let busqueda = document.formu.busqueda.value;
    if (expresionReg.buscador.test(busqueda)){
        document.formu.submit();
    } 
}