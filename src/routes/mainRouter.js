/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

router.get('/', productController.index);
router.get('/cart', productController.cart);
router.get('/login', userController.login);
router.get('/register', userController.register);

module.exports = router;