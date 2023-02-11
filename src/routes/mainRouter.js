/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const isLogged = require('../middlewares/users/isLogged');

router.get('/', productController.index);

router.get('/cart', isLogged, productController.cart);

module.exports = router;