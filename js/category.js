let qs = location.search;
let qsObj = new URLSearchParams(qs);
let IDReceta = qsObj.get("category");

let categoria = document.querySelector("#categoryTitle");
let recetasDeCategoria = document.querySelector("#recipesContainer");

if (!IDReceta) {
    categoria.innerText = "Categoría no encontrada";
    recetasDeCategoria.innerHTML = "<p>No se especificó una categoría válida.</p>";
} else {
    categoria.innerHTML = `Categoría: <span style="color: rgba(29, 75, 40, 0.559);">${IDReceta}</span>`;


    let url = "https://dummyjson.com/recipes";

    recetasDeCategoria.innerHTML = "<p>Cargando recetas...</p>";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let recetasHTML = ""; 

            if (data.recipes && data.recipes.length > 0) {
                for (let i = 0; i < data.recipes.length; i++) {
                    let receta = data.recipes[i];

                    if (receta.tags) {
                        for (let j = 0; j < receta.tags.length; j++) {
                            if (receta.tags[j] === IDReceta) {
                                recetasHTML += `
                                    <article class="articleRecetas">
                                        <img src="${receta.image}" alt="${receta.name}" class="img_recetas">
                                        <section class="info_recetas">
                                            <p class="nombreReceta">${receta.name}</p>
                                            <p class="dificultadReceta">Dificultad: ${receta.difficulty}</p>
                                            <a href="receta.html?id=${receta.id}" class="detalleLink">Ir a detalle</a>
                                        </section>
                                    </article>
                                `;
                            }
                        }
                    }
                }
            }

            if (recetasHTML === "") {
                recetasDeCategoria.innerHTML = "<p>No hay recetas para esta categoría.</p>";
            } else {
                recetasDeCategoria.innerHTML = recetasHTML;
            }
        })
        .catch(function (error) {
            console.log("El error es: " + error);
            recetasDeCategoria.innerHTML = "<p>Error al cargar las recetas. Intenta nuevamente.</p>";
        });
}