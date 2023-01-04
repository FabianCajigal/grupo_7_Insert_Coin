const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.list)
router.get('/create', productController.create);
router.get('/edit', productController.edit);
router.get('/detail', productController.detail);

module.exports = router;