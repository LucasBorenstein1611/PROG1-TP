// Seleccionar elementos del DOM
let resultsContainer = document.querySelector(".search_container");
let searchTitulo = document.querySelector(".search_titulo")

// Obtener el término de búsqueda de la URL
let queryString = location.search; // Obtiene la parte de la URL después del "?"
let params = new URLSearchParams(queryString);
let searchTerm = params.get("q"); // Obtiene el valor del parámetro "q"

// Mostrar el término buscado
if (searchTerm) {
    searchTitulo.innerHTML = `Resultados de Búsqueda para: <span style="color: rgba(29, 75, 40, 0.559);">${searchTerm}</span>`

    // Llamar a la API para obtener los resultados
    fetch(`https://dummyjson.com/recipes/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.recipes && data.recipes.length > 0) {
                let resultsHTML = "";

                // Generar HTML para cada resultado
                for (let i = 0; i < data.recipes.length; i++) {
                    let recipe = data.recipes[i];
                    resultsHTML += `
                        <article class="search_result">
                            <img src="${recipe.image}" alt="${recipe.name}" class="search_result_image">
                            <h2 class="search_result_title">${recipe.name}</h2>
                            <a href="receta.html?id=${recipe.id}" class="search_result_link">Ver detalle</a>
                        </article>
                    `;
                }

                // Insertar resultados en el contenedor
                resultsContainer.innerHTML = resultsHTML;
            } else {
                // Mostrar mensaje si no hay resultados
                resultsContainer.innerHTML = `<p>No se encontraron resultados para "${searchTerm}".</p>`;
                resultsContainer.style.color = "red"
                resultsContainer.style.textAlign = "center"
                resultsContainer.style.marginTop = "2%"
                
            }
        })
        .catch(error => {
            console.error(`Error al cargar los resultados: ${error}`);
            resultsContainer.innerHTML = `<p>Error al cargar los resultados. Intenta nuevamente más tarde.</p>`;
        });
} 
    

