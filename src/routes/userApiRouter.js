/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const userApiController = require('../controllers/userApiController');

/*------------ Get full users list ------------*/
router.get('/', userApiController.list);

/*------------ Get user detail ------------*/
router.get('/:id', userApiController.detail);

module.exports = router;