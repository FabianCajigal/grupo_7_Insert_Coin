const { check } = require ('express-validator');

module.exports = [
    check ('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({min:5}).withMessage('El nombre del producto debe contar con al menos 5 caracteres'),
    check ('longDescription')
        .isLength({min:20}).withMessage('La descripción del producto debe contar con al menos 20 caracteres')
]