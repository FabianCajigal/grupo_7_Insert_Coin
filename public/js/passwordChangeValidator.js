window.addEventListener('load', () => {
    const form = document.querySelector('form.create-form');
    const oldPassword = document.querySelector('input#oldPassword');
    const password = document.querySelector('input#password');
    const passwordConfirm = document.querySelector('input#passwordConfirm');
    const oldPasswordError = document.querySelector('small#oldPasswordError');
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

        if (oldPassword.value.length == 0) {
            errores.oldPassword = 'Ingrese su contraseña anterior';
        }

        if (password.value.length == 0) {
            errores.password = 'Ingrese una contraseña';
        }

        if (password.value.length > 0 && password.value.length < 8) {
            errores.password = 'La contraseña debe contener al menos 8 caracteres';
        }

        if (Object.keys(errores).length >= 1) {
            oldPasswordError.innerText = errores.oldPassword ? errores.oldPassword : '';
            passwordError.innerText = errores.password ? errores.password : '';
        }
        else {
            form.submit();
        }

    })

});