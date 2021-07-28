const express = require('express');
const rescue = require('express-rescue');
const validateJWT = require('../middlewares/validateJWT');
const {runsController} = require('../controllers')

const router = express.Router();
router.get('/', rescue(runsController.getAll));
router.get('/:id', rescue(runsController.getById));
router.put('/:id', validateJWT, rescue(runsController.updateById));
router.post('/', validateJWT,rescue(runsController.create));


module.exports = router;