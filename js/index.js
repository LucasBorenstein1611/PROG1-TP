// Seleccionar el formulario y el campo de entrada
const formularioBusqueda = document.getElementById("formularioBusqueda");
const entradaBusqueda = document.getElementById("entradaBusqueda");

// Agregar un evento al formulario para manejar la validación
formularioBusqueda.addEventListener("submit", function (event) {
    // Evitar que el formulario se envíe si la validación falla
    if (!validarBusqueda()) {
        event.preventDefault(); // Detiene el envío del formulario
    }
});

// Función para validar el término de búsqueda
function validarBusqueda() {
    const terminoBusqueda = entradaBusqueda.value.trim(); // Eliminar espacios en blanco al inicio y final

    if (terminoBusqueda === "") {
        // Si está vacío, mostrar un mensaje de error
        entradaBusqueda.placeholder = "El campo está vacío";
        entradaBusqueda.style.borderColor = "red"; // Cambiar el borde del campo
        console.log("El campo está vacío");
        return false;
    } else if (terminoBusqueda.length < 3) {
        // Si el término es menor a 3 caracteres, mostrar un mensaje de error
        entradaBusqueda.value = ""; // Limpia el campo para volver a intentar
        entradaBusqueda.placeholder = "Mínimo 3 caracteres";
        entradaBusqueda.style.borderColor = "red"; // Cambiar el borde del campo
        console.log("El término es demasiado corto");
        return false;
    } else {
        // Si pasa la validación, restablecer el estilo
        entradaBusqueda.style.borderColor = ""; // Restaurar el color del borde
        return true;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let recetasContainer = document.querySelector(".index_recetas_container");
    let botonCargar = document.querySelector(".index_boton_cargar");

    let recetasMostradas = 0;
    const recetasPorPagina = 10;

    function cargarRecetas() {
        fetch(`https://dummyjson.com/recipes?skip=${recetasMostradas}&limit=${recetasPorPagina}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.recipes) {
                    let recetasHTML = "";
                    for (let i = 0; i < data.recipes.length; i++) {
                        let receta = data.recipes[i];
                        recetasHTML += `
                            <article class="index_receta">
                                <img src="${receta.image}" class="index_imagenes" />
                                <h2 class="index_titulo">${receta.name}</h2>
                                <p class="index_dificultad">Dificultad: ${receta.difficulty}</p>
                                <a href="receta.html?id=${receta.id}" class="index_detalle">Ver detalle</a>
                            </article>
                        `;
                    }
                    recetasContainer.innerHTML += recetasHTML;
                    recetasMostradas += recetasPorPagina;
                } else {
                    recetasContainer.innerHTML = `<p>No se encontraron recetas para mostrar.</p>`;
                }
            })
            .catch((error) => {
                console.error(`Error al cargar las recetas: ${error}`);
            });
    }

    // Asignar el evento al botón de cargar más
    botonCargar.addEventListener("click", cargarRecetas);

    // Cargar recetas al cargar la página
    cargarRecetas();
});
