const express = require('express');
const {usersController} = require('../controllers')

const router = express.Router();
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById)
router.put('/:id', usersController.updateById)
router.post('/', usersController.create)

module.exports = router;