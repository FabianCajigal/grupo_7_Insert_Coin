const { check } = require ('express-validator');

module.exports = [
    check ('username')
        .notEmpty().withMessage('Ingrese un nombre de usuario').bail(),
    check ('password')
        .notEmpty().withMessage('Ingrese su contraseña').bail()
]