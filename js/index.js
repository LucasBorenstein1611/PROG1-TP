const formularioBusqueda = document.getElementById("formularioBusqueda");
formularioBusqueda.addEventListener("submit", function(event) {
    if (!validarBusqueda()) {
        event.preventDefault(); // Evita el envío del formulario si es inválido
    }
});

function validarBusqueda() {
    const entradaBusqueda = document.getElementById("entradaBusqueda");
    const terminoBusqueda = entradaBusqueda.value;

    if (terminoBusqueda === "") {
        entradaBusqueda.placeholder = "Campo vacío";
        entradaBusqueda.style.borderColor = "red"; // Cambia el color del borde
        console.log("Campo de texto vacío");
        return false;
    } else if (terminoBusqueda.length < 3) {
        entradaBusqueda.value = ""; // Limpia la entrada para que sea obvio el error
        entradaBusqueda.placeholder = "Menos de 3 caracteres";
        entradaBusqueda.style.borderColor = "red"; // Cambia el color del borde
        console.log("menos de 3 caracteres");
        return false;
    } else {
        entradaBusqueda.style.borderColor = ""; // Restaura el color si es válido
        return true;
    }
}
