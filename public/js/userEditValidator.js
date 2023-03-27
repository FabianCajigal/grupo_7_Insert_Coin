window.addEventListener('load', () => {
    const form = document.querySelector('form.create-form');
    const email = document.querySelector('input#email');
    const username = document.querySelector('input#username');
    const emailError = document.querySelector('small#emailError');
    const usernameError = document.querySelector('small#usernameError');


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let errores = {};

        if (email.value.length == 0) {
            errores.email = 'Ingrese un email';
        }

        if (username.value.length == 0) {
            errores.username = 'Ingrese un nombre de usuario';
        }

        if (username.value.length > 0 && username.value.length < 2) {
            errores.username = 'El nombre de usuario debe contener al menos 2 caracteres';
        }

        if (Object.keys(errores).length >= 1) {
            emailError.innerText = errores.email ? errores.email : '';
            usernameError.innerText = errores.username ? errores.username : '';
        }
        else {
            form.submit();
        }

    })

});