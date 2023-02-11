/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const path = require('path');
const userController = require('../controllers/userController');
const isLogged = require('../middlewares/users/isLogged');
const isUnlogged = require('../middlewares/users/isUnlogged');
const multer = require('multer');

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
router.post('/register', isUnlogged, upload.single('image'), userController.store);

router.get('/login', isUnlogged, userController.login);
router.post('/login', userController.authenticate);

router.get('/edit', isLogged, userController.edit);
router.put('/edit', isLogged, userController.update);

router.get('/password-change', isLogged, userController.passwordChange);

router.post('/logout', isLogged, userController.logout);

module.exports = router;