const express = require('express');
const rescue = require('express-rescue');
const {usersController} = require('../controllers')

const router = express.Router();
router.get('/', rescue(usersController.getAll));
router.get('/:id', rescue(usersController.getById));
router.put('/:id', rescue(usersController.updateById));
router.post('/', rescue(usersController.create));
router.post('/login', rescue(usersController.login))

module.exports = router;