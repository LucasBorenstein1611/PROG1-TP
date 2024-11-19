// Seleccionar el formulario y los campos de entrada
let formularioLogIn = document.querySelector(".login_formulario");
let email = document.querySelector(".login_email");
let contra = document.querySelector(".login_contra");
let Tyc = document.querySelector(".register_tyc")

// Agregar evento al formulario
formularioLogIn.addEventListener("submit", function (event) {
    event.preventDefault(); // Detener el envío por defecto

    let errors = false;

    // Validar campo email
    if (email.value === "") {
        email.placeholder = "Por favor complete el campo";
        email.style.borderColor = "red";
        errors = true;
    } else {
        email.style.borderColor = "";
    }

    // Validar campo contraseña
    if (contra.value === "") {
        contra.placeholder = "Por favor complete el campo";
        contra.style.borderColor = "red";;
        errors = true;
    } else {
        contra.style.borderColor = "";
    }

    if (!Tyc.checked) {
        alert("Debe aceptar los términos y condiciones para continuar")
        errors = true
    }

    // Si no hay errores, enviar el formulario
    if (!errors) {
        formularioLogIn.submit();
    }
});


