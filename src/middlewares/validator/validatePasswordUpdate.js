const { check } = require ('express-validator');

module.exports = [
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