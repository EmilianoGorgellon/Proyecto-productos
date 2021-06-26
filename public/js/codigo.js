const buscar = () => {
    let busqueda = document.formu.busqueda.value;
    if (/^[a-zA-Z0-9\.]+$/.test(busqueda)){
        document.formu.submit();
    } else {
        alert("NO cumple con los criterios de busqueda")
    }
}
const buttonEnviar = () =>{
    let nombre = document.formulario.nombre.value;
    let email = document.formulario.email.value;
    let msj = document.formulario.msj.value;
    if ((/^[a-zA-Z]+$/).test(nombre) && (/^[a-zA-Z0-9]+$/).test(email) && (/^[a-zA-Z0-9]+$/).test(msj)){
        alert("Formulario enviado correctamente")
        document.formulario.reset();
    } else {
        alert("Nombre, email y/o mensaje formato incorrecto")
    }
}
