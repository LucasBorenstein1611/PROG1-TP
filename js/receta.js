// Selecciona el contenedor para mostrar los detalles de la receta
let recetaDetalleContainer = document.querySelector(".receta_detalle_container");

// Obtiene el ID de la receta desde la URL
let queryString = location.search; // Obtiene la parte de la URL después del "?"
let params = new URLSearchParams(queryString);
let recetaId = params.get("id"); // Obtiene el valor del parámetro "id"

// Verifica si el ID está presente
if (recetaId) {
    fetch(`https://dummyjson.com/recipes/${recetaId}`)
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                let recetaHTML = `
                    <article class="receta_detalle">
                        <img src="${data.image}" alt="${data.name}" class="receta_detalle_imagen">
                        <h2 class="receta_detalle_titulo">${data.name}</h2>
                        <p class="receta_detalle_tiempo">Tiempo de cocción: ${data.cookingTime} minutos</p>
                        <h3>Instrucciones:</h3>
                        <p class="receta_detalle_instrucciones">${data.instructions}</p>
                        <h3>Categorías:</h3>
                        <ul class="receta_detalle_categorias">
                            ${data.categories
                                .map(
                                    (categoria) => `
                                <li><a href="categories.html?categoria=${categoria}" class="categoria_enlace">${categoria}</a></li>
                            `
                                )
                                .join("")}
                        </ul>
                    </article>
                `;
                recetaDetalleContainer.innerHTML = recetaHTML;
            } else {
                recetaDetalleContainer.innerHTML = `<p>No se encontraron datos para esta receta.</p>`;
            }
        })
        .catch((error) => {
            console.error(`Error al cargar los detalles de la receta: ${error}`);
            recetaDetalleContainer.innerHTML = `<p>Error al cargar los detalles. Intenta nuevamente más tarde.</p>`;
        });
} else {
    recetaDetalleContainer.innerHTML = `<p>No se especificó un ID de receta válido.</p>`;
}
