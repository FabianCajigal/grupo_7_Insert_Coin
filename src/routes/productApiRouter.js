/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/productApiController');

/*------------ Get full products list ------------*/
router.get('/', productApiController.list);

/*------------ Get product detail ------------*/
router.get('/:id', productApiController.detail);

module.exports = router;