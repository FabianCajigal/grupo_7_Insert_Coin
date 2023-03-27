window.addEventListener('load', () => {
    const form = document.querySelector('form.create-form');
    const username = document.querySelector('input#username');
    const password = document.querySelector('input#password');
    const usernameError = document.querySelector('small#usernameError');
    const passwordError = document.querySelector('small#passwordError');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let errores = {};

        if (username.value.length == 0) {
            errores.username = 'Ingrese un nombre de usuario';
        }

        if (password.value.length == 0) {
            errores.password = 'Ingrese su contraseña';
        }
        
        if (Object.keys(errores).length >= 1) {
            usernameError.innerText = errores.username ? errores.username : '';
            passwordError.innerText = errores.password ? errores.password : '';
        }
        else {
            form.submit();
        }

    })

});