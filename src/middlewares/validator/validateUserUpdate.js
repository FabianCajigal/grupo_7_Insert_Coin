const { check } = require ('express-validator');

module.exports = [
    check ('username')
        .notEmpty().withMessage('Ingrese un nombre de usuario').bail()
        .isLength({min:2}).withMessage('El nombre de usuario debe contar con al menos 2 caracteres'),
    check ('email')
        .notEmpty().withMessage('Ingrese un email').bail()
        .isEmail().withMessage('Debe completar con un email válido').bail()
]