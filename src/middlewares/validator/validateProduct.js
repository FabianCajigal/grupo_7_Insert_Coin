const { check } = require ('express-validator');

module.exports = [
    check ('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({min:5}).withMessage('El nombre del producto debe contar con al menos cinco caracteres'),
    check ('longDescription')
        .isLength({min:20}).withMessage('La descripción es demasiado corta, debe tener al menos 20 caracteres')
]