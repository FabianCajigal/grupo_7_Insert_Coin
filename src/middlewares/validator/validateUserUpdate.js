const { check } = require ('express-validator');

module.exports = [
    check ('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio').bail()
        .isLength({min:2}).withMessage('El nombre de usuario debe contar con al menos dos caracteres'),
    check ('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debes completar con un email válido').bail()
]