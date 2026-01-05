const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/register', userController.register);
router.get('/', userController.listUsers);

module.exports = router;
