// BOTON FORMULARIO

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
        entradaBusqueda.style.borderColor = ""; // Restaura el color si es válido si es que fue cambiado antes por un error
        return false;
    }
}

// CARGAR IMAGENES 

// Selecciona el contenedor de recetas y el botón de "Cargar más"
let recetasContainer = document.querySelector(".index_recetas_container");
let botonCargar = document.querySelector(".index_boton_cargar");

// Variables de control para el número de recetas mostradas
let recetasMostradas = 0;
const recetasPorPagina = 10;

// Función para cargar recetas desde la API
function cargarRecetas() {
    fetch(`https://dummyjson.com/recipes?skip=${recetasMostradas}&limit=${recetasPorPagina}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.recipes) {
                let recetasHTML = ""; 
                for (let i = 0; i < data.recipes.length; i++) { 
                    let receta = data.recipes[i];
                    recetasHTML += `
                        <article class="index_receta">
                            <img src="${receta.image}" class="index_imagenes"/>
                            <h2 class="index_titulo">${receta.name}</h2>            
                            <p class="index_dificultad">Dificultad: ${receta.difficulty}</p>            
                            <a href="detalle.html?id=${receta.id}" class="index_detalle">Ver detalle</a>
                        </article>
                    `;
                }
                recetasContainer.innerHTML += recetasHTML;
                recetasMostradas += recetasPorPagina;
            } else {
                recetasContainer.innerHTML = `<p>No se encontraron recetas para mostrar.</p>`;
            }
        })
        .catch(function(error) {
            console.log(`El error es ${error}`);
            recetasContainer.innerHTML = `<p>Error al cargar las recetas. Intenta nuevamente.</p>`;
        });
}

// Funcion para argar más recetas cada vez que el usuario hace click en el botón
botonCargar.addEventListener("click", cargarRecetas);

// Cargar las primeras recetas al cargar la página de manera automatica
document.addEventListener("DOMContentLoaded", cargarRecetas);

