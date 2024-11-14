// Selecciona el contenedor de recetas y el botón de "Cargar más"
let recetasContainer = document.querySelector(".index_recetas_container");
let botonCargar = document.querySelector(".index_boton_cargar");

// Variables de control
let recetasMostradas = 0;
const recetasPorPagina = 10;

// Función para cargar recetas desde la API
function cargarRecetas() {
    fetch(`https://dummyjson.com/recipes?skip=${recetasMostradas}&limit=${recetasPorPagina}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.recipes) {
                let recetasHTML = data.recipes
                    .map((receta) => `
                        <article class="index_receta">
                            <img src="${receta.image}" class="index_imagenes" />
                            <h2 class="index_titulo">${receta.name}</h2>
                            <p class="index_dificultad">Dificultad: ${receta.difficulty}</p>
                            <a href="receta.html?id=${receta.id}" class="index_detalle">Ver detalle</a>
                        </article>
                    `)
                    .join("");
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

// Evento para cargar más recetas
botonCargar.addEventListener("click", cargarRecetas);

// Cargar recetas al cargar la página
document.addEventListener("DOMContentLoaded", cargarRecetas);
