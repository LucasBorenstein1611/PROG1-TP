
const categoriesContainer = document.getElementById("categoriesContainer");

function cargarCategorias() {
    fetch("https://dummyjson.com/recipes")
        .then(response => response.json())
        .then(data => {
            console.log(data); 

            if (data.recipes && data.recipes.length > 0) {
                let categoriasUnicas = [];

                for (let i = 0; i < data.recipes.length; i++) {
                    const receta = data.recipes[i];
                    
                    if (receta.tags && receta.tags.length > 0) {
                        for (let j = 0; j < receta.tags.length; j++) {
                            const tag = receta.tags[j];
                            
                            let yaExiste = false;
                            for (let k = 0; k < categoriasUnicas.length; k++) {
                                if (categoriasUnicas[k] === tag) {
                                    yaExiste = true;
                                }
                            }

                            if (yaExiste === false) {
                                categoriasUnicas.push(tag);
                            }
                        }
                    }
                }
                
                let categoriesHTML = '';
                for (let i = 0; i < categoriasUnicas.length; i++) {
                    categoriesHTML += `
                        <article class="categories_item">
                            <h2 class="categories_titulo">${categoriasUnicas[i]}</h2>
                            <button class="categories-button" onclick="mostrarRecetas('${categoriasUnicas[i]}')">Ver Recetas</button>
                        </article>
                    `;
                }

                if (categoriesHTML) {
                    categoriesContainer.innerHTML = categoriesHTML;
                } else {
                    categoriesContainer.innerHTML = '<p>No hay categorías disponibles.</p>';
}
            } else {
                categoriesContainer.innerHTML = `<p>No se encontraron recetas.</p>`;
            }
        })
        .catch(error => {
            console.error(`Error al cargar las categorías: ${error}`);
            categoriesContainer.innerHTML = `<p>Error al cargar las categorías. Intenta nuevamente.</p>`;
        });
}

document.addEventListener("DOMContentLoaded", cargarCategorias);
function mostrarRecetas(tag) {
    console.log(`Mostrar recetas del tag: ${tag}`);
}
