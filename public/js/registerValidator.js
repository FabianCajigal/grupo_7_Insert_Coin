window.addEventListener('load', () => {
    const form = document.querySelector('form.create-form');
    const email = document.querySelector('input#email');
    const username = document.querySelector('input#username');
    const password = document.querySelector('input#password');
    const passwordConfirm = document.querySelector('input#passwordConfirm');
    const emailError = document.querySelector('small#emailError');
    const usernameError = document.querySelector('small#usernameError');
    const passwordError = document.querySelector('small#passwordError');
    const passwordConfirmError = document.querySelector('small#passwordConfirmError');

    passwordConfirm.addEventListener('change', (event) => {
        if (passwordConfirm.value != password.value) {
            passwordConfirmError.innerText = 'Las contraseñas no coinciden';
        }

        if (passwordConfirm.value == password.value) {
            passwordConfirmError.innerText = '';
        }
    })

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

        if (password.value.length == 0) {
            errores.password = 'Ingrese una contraseña';
        }

        if (password.value.length > 0 && password.value.length < 8) {
            errores.password = 'La contraseña debe contener al menos 8 caracteres';
        }

        if (Object.keys(errores).length >= 1) {
            emailError.innerText = errores.email ? errores.email : '';
            usernameError.innerText = errores.username ? errores.username : '';
            passwordError.innerText = errores.password ? errores.password : '';
        }
        else {
            form.submit();
        }

    })

});