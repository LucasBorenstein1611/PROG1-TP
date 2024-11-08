const formularioBusqueda = document.getElementById("formularioBusqueda");
formularioBusqueda.addEventListener("submit", function(event) {
    if (validarBusqueda()) {
        event.preventDefault(); // Evita el envío del formulario si es inválido
    }
});

function validarBusqueda() {
    const entradaBusqueda = document.getElementById("entradaBusqueda");
    const terminoBusqueda = entradaBusqueda.value;

    if (terminoBusqueda === "") {
        entradaBusqueda.placeholder = "Campo vacío";
        entradaBusqueda.style.borderColor = "red";
        console.log("Campo de texto vacío");
        return true;
    } else if (terminoBusqueda.length < 3) {
        entradaBusqueda.value = ""; // Limpia la entrada para volver a intentar de cero y que se lea el mensaje
        entradaBusqueda.placeholder = "Menos de 3 caracteres";
        entradaBusqueda.style.borderColor = "red"; 
        console.log("menos de 3 caracteres");
        return true;
    } else {
        entradaBusqueda.style.borderColor = ""; // Restaura el color si es válido
        return false;
    }
}
