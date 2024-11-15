let recetaDetalleContainer = document.querySelector(".receta_detalle_container");

let queryString = location.search;
let params = new URLSearchParams(queryString);
let recetaId = params.get("id");

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
                `;

                // Verificar si hay categorías y agregarlas
                if (data.categories && data.categories.length > 0) {
                    let categoriasHTML = "";
                    for (let i = 0; i < data.categories.length; i++) {
                        categoriasHTML += `
                            <li><a href="categories.html?categoria=${data.categories[i]}" class="categoria_enlace">${data.categories[i]}</a></li>
                        `;
                    }

                    recetaHTML += `
                        <h3>Categorías:</h3>
                        <ul class="receta_detalle_categorias">${categoriasHTML}</ul>
                    `;
                } else {
                    recetaHTML += `<p>No hay categorías disponibles para esta receta.</p>`;
                }

                recetaHTML += `</article>`;
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
