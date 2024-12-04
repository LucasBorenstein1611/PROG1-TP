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

    
    botonCargar.addEventListener("click", cargarRecetas);

    
    cargarRecetas();
});