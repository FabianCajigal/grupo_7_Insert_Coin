/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isLogged = require('../middlewares/users/isLogged');
const isUnlogged = require('../middlewares/users/isUnlogged');


router.get('/', isLogged, userController.profile);

router.get('/register', isUnlogged, userController.register);

router.get('/login', isUnlogged, userController.login);
router.post('/login', userController.authenticate);

router.get('/edit', isLogged, userController.edit);
router.put('/edit', isLogged, userController.update);

router.get('/password-change', isLogged, userController.passwordChange);

router.post('/logout', isLogged, userController.logout);

module.exports = router;