// Seleccionar el formulario y los campos de entrada
let formularioLogIn = document.querySelector(".login_formulario");
let email = document.querySelector(".login_email");
let contra = document.querySelector(".login_contra");

// Agregar evento al formulario
formularioLogIn.addEventListener("submit", function (event) {
    event.preventDefault(); // Detener el envío por defecto

    let errors = false;

    // Validar campo email
    if (email.value === "") {
        alert("Por favor complete el campo email");
        errors = true;
    }

    // Validar campo contraseña
    if (contra.value === "") {
        alert("Por favor complete el campo contraseña");
        errors = true;
    }

    // Si no hay errores, enviar el formulario
    if (!errors) {
        formularioLogIn.submit();
    }
});


