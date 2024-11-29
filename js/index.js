
let formularioBusqueda = document.querySelector("#formularioBusqueda");
let entradaBusqueda = document.querySelector("#entradaBusqueda");


formularioBusqueda.addEventListener("submit", function (event) { 
    event.preventDefault(); 

    let errors = false;

    
    if (entradaBusqueda.value === "") {
        entradaBusqueda.placeholder = "El campo está vacío";
        entradaBusqueda.style.borderColor = "red"; 
        
        errors = true;
    } else if (entradaBusqueda.value.length < 3) {
        entradaBusqueda.value = ""; 
        entradaBusqueda.placeholder = "Mínimo 3 caracteres";
        entradaBusqueda.style.borderColor = "red"; 
        
        errors = true;
    } else {
        entradaBusqueda.style.borderColor = ""; 
    }

    
    if (!errors) {
        formularioBusqueda.submit();
    }
});



