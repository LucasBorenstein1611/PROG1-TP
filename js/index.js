// Seleccionar el formulario y el campo de entrada
let formularioBusqueda = document.querySelector("#formularioBusqueda");
let entradaBusqueda = document.querySelector("#entradaBusqueda");

// Agregar evento al formulario
formularioBusqueda.addEventListener("submit", function (event) {
    event.preventDefault(); // Detener el envío por defecto

    let errors = false;

    // Validar campo de búsqueda
    if (entradaBusqueda.value === "") {
        entradaBusqueda.placeholder = "El campo está vacío";
        entradaBusqueda.style.borderColor = "red"; // Cambiar el borde del campo
        console.log("El campo está vacío");
        errors = true;
    } else if (entradaBusqueda.value.length < 3) {
        entradaBusqueda.value = ""; // Limpia el campo para volver a intentar
        entradaBusqueda.placeholder = "Mínimo 3 caracteres";
        entradaBusqueda.style.borderColor = "red"; // Cambiar el borde del campo
        console.log("El término es demasiado corto");
        errors = true;
    } else {
        entradaBusqueda.style.borderColor = ""; // Restaurar el color del borde
    }

    // Si no hay errores, enviar el formulario
    if (!errors) {
        formularioBusqueda.submit();
    }
});


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

    // Asignar el evento al botón de cargar más
    botonCargar.addEventListener("click", cargarRecetas);

    // Cargar recetas al cargar la página
    cargarRecetas();
});
