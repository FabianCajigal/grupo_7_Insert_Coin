/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const isLogged = require('../middlewares/users/isLogged');
const isUnlogged = require('../middlewares/users/isUnlogged');
const multer = require('multer');
const validateRegister = require('../middlewares/validator/validateRegister');
const validateUserUpdate = require('../middlewares/validator/validateUserUpdate');
const validatePasswordUpdate = require('../middlewares/validator/validatePasswordUpdate');
const validateLogin = require('../middlewares/validator/validateLogin');

/*------------ Multer setup ------------*/
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/img/users'));
    },
    filename: function (req, file, cb) {
        cb(null, `users-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({ storage });

router.get('/', isLogged, userController.profile);

router.get('/register', isUnlogged, userController.register);
router.post('/register', isUnlogged, upload.single('image'), validateRegister, userController.store);

router.get('/login', isUnlogged, userController.login);
router.post('/login', isUnlogged, validateLogin, userController.authenticate);

router.get('/edit', isLogged, userController.edit);
router.put('/edit', isLogged, upload.single('image'), validateUserUpdate, userController.update);

router.get('/password-change', isLogged, userController.passwordChange);
router.put('/password-change', isLogged, validatePasswordUpdate, userController.passwordUpdate);

router.post('/logout', isLogged, userController.logout);

module.exports = router;