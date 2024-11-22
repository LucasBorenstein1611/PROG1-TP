let formularioLogIn = document.querySelector(".login_formulario");
let email = document.querySelector(".login_email");
let contra = document.querySelector(".login_contra");

formularioLogIn.addEventListener("submit", function (event) {
    event.preventDefault(); 

    let errors = false;

    if (email.value === "") {
        alert("Por favor complete el campo email");
        errors = true;
    }

    if (contra.value === "") {
        alert("Por favor complete el campo contraseña");
        errors = true;
    }

    if (!errors) {
        formularioLogIn.submit();
    }
});


