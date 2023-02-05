/*------------ Requires ------------*/
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile', userController.profile);

router.get('/:id/edit', userController.edit);

router.get('/:id/password-change', userController.passwordChange);

module.exports = router;