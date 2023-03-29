window.addEventListener('load', () => {
    const form = document.querySelector('form.create-form');
    const name = document.querySelector('input#name');
    const longDescription = document.querySelector('textarea#longDescription');
    const nameError = document.querySelector('small#nameError');
    const longDescriptionError = document.querySelector('small#longDescriptionError');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        let errores = {};

        if (name.value.length == 0) {
            errores.name = 'El nombre del producto es obligatorio';
        }
        if (name.value.length > 0 && name.value.length < 5) {
            errores.name = 'El nombre del producto debe contar con al menos 5 caracteres';
        }

        if (longDescription.value.length == 0) {
            errores.longDescription = 'La descripción del producto es obligatoria';
        }
        if (longDescription.value.length > 0 && longDescription.value.length < 20) {
            errores.longDescription = 'La descripción del producto debe contar con al menos 20 caracteres';
        }

        if (Object.keys(errores).length >= 1) {
            nameError.innerText = errores.name ? errores.name : '';
            longDescriptionError.innerText = errores.longDescription ? errores.longDescription : '';
        }
        else {
            form.submit();
        }

    })

});