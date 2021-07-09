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


const buttonEnviar = () =>{
    let nombre = document.formulario.nombre.value;
    let email = document.formulario.email.value;
    let msj = document.formulario.msj.value;
    if (expresionesReg.nombre.test(nombre) && expresionesReg.email.test(email) && expresionesReg.mensaje.test(msj)){
        alert("Formulario enviado correctamente")
        document.formulario.reset();
    } else {
        alert("Nombre, email y/o mensaje formato incorrecto")
    }
}
