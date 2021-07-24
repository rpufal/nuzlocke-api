const express = require('express');
const {runsController} = require('../controllers')

const router = express.Router();
router.get('/', runsController.getAll);
router.post('/', runsController.create)

module.exports = router;