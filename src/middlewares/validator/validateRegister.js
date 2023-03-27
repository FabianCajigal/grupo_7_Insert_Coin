const { check } = require ('express-validator');

module.exports = [
    check ('username')
        .notEmpty().withMessage('Ingrese un nombre de usuario').bail()
        .isLength({min:2}).withMessage('El nombre de usuario debe contar con al menos 2 caracteres'),
    check ('email')
        .notEmpty().withMessage('Ingrese un email').bail()
        .isEmail().withMessage('Debe completar con un email válido').bail(),
    check ('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({min:8}).withMessage('La contraseña es demasiado corta, debe tener al menos 8 caracteres'),
    check ('passwordConfirm').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
]