let recetaDetalleContainer = document.querySelector(".receta_container");

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
                        <img src="${data.image}" alt="${data.name}" class="receta_imagen">
                        <h2 class="receta_titulo">${data.name}</h2>
                        <p class="receta_tiempo">Tiempo de cocción: ${data.cookTimeMinutes} minutos</p>
                        <h3 class="receta_titulo">Instrucciones:</h3>
                        <p class="receta_instrucciones">${data.instructions}</p>
                `;

                // Verificar si hay categorías y agregarlas
                if (data.tags && data.tags.length > 0) {
                    let categoriasHTML = "";
                    for (let i = 0; i < data.tags.length; i++) {
                        categoriasHTML += `
                            <li><a href="categories.html?categoria=${data.tags[i]}" class="receta_categorias">${data.tags[i]}</a></li>
                        `;  
                    }

                    recetaHTML += `
                        <h3 class="receta_titulo_categorias">Categorías:</h3>
                        <ul class="receta_lista">${categoriasHTML}</ul>
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
