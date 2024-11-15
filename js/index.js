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


// Selecciona el contenedor de recetas y el botón de "Cargar más"
let recetasContainer = document.querySelector(".index_recetas_container");
let botonCargar = document.querySelector(".index_boton_cargar");

// Variables de control
let recetasMostradas = 0;
const recetasPorPagina = 10;

// Función para cargar recetas desde la API
function cargarRecetas() {
    fetch(`https://dummyjson.com/recipes?skip=${recetasMostradas}&limit=${recetasPorPagina}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.recipes && data.recipes.length > 0) {
                let recetasHTML = "";

                // Bucle for para recorrer las recetas
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

                // Agregar las recetas al contenedor
                recetasContainer.innerHTML += recetasHTML;

                // Actualizar el contador de recetas mostradas
                recetasMostradas += recetasPorPagina;
            } else {
                // Si no hay recetas, mostrar un mensaje
                recetasContainer.innerHTML = `<p>No se encontraron recetas para mostrar.</p>`;
            }
        })
        .catch(function(error) {
            console.error(`Error al cargar las recetas: ${error}`);
        });
}

// Evento para cargar más recetas
botonCargar.addEventListener("click", cargarRecetas);

// Cargar recetas al cargar la página
document.addEventListener("DOMContentLoaded", cargarRecetas);
