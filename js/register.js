let formularioLogIn = document.querySelector(".login_formulario");
let email = document.querySelector(".login_email");
let contra = document.querySelector(".login_contra");
let Tyc = document.querySelector(".register_tyc")

formularioLogIn.addEventListener("submit", function (event) {
    event.preventDefault(); 

    let errors = false;

    if (email.value === "") {
        email.placeholder = "Por favor complete el campo";
        email.style.borderColor = "red";
        errors = true;
    } else {
        email.style.borderColor = "";
    }

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

    if (!errors) {
        formularioLogIn.submit();
    }
});


