const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/create', productController.create);
router.get('/detail', productController.detail);

module.exports = router;