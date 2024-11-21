const url = window.location.search;
const categoriaSeleccionada = url.split("=")[1];

const categoryTitle = document.querySelector("#categoryTitle");
const recipesContainer = document.querySelector("#recipesContainer");

if (categoriaSeleccionada) {
    categoryTitle.textContent = "Categoría: " + categoriaSeleccionada;
    cargarRecetas(categoriaSeleccionada);
} else {
    categoryTitle.textContent = "Categoría no encontrada.";
    recipesContainer.innerHTML = "<p>Por favor, selecciona una categoría válida.</p>";
}

function cargarRecetas(categoria) {
    fetch("https://dummyjson.com/recipes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let recetasHTML = "";

            for (let i = 0; i < data.recipes.length; i++) {
                let receta = data.recipes[i];

                // Verificar si la receta tiene etiquetas
                if (receta.tags) {
                    for (let j = 0; j < receta.tags.length; j++) {
                        // Comparar la categoría seleccionada con las etiquetas
                        if (receta.tags[j] === categoria) {
                            const title = receta.name || "Sin título";
                            const description = receta.instructions
                                ? receta.instructions.join(". ") // Unir instrucciones como descripción
                                : "Sin descripción";

                            recetasHTML += `
                                <article>
                                    <h2 class="titulo_category">${title}</h2>
                                    <p class="descripcion_category">${description}</p>
                                    <img src="${receta.image}" alt="${title}" class="img_recetas">
                                </article>
                            `;
                        }
                    }
                }
            }

            if (recetasHTML === "") {
                recipesContainer.innerHTML = "<p>No hay recetas para esta categoría.</p>";
            } else {
                recipesContainer.innerHTML = recetasHTML;
            }
        })
        .catch(function () {
            recipesContainer.innerHTML = "<p>Error al cargar las recetas. Intenta nuevamente.</p>";
        });
}

