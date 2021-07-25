const express = require('express');
const {runsController} = require('../controllers')

const router = express.Router();
router.get('/', runsController.getAll);
router.get('/:id', runsController.getById)
router.put('/:id', runsController.updateById)
router.post('/', runsController.create)

module.exports = router;