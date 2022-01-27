'use strict'

var express = require('express');
var router = express.Router();

var controller = require('./controller')

router.get('/',controller.hello);
router.post('/',controller.hello);
router.post('/findServer', controller.findServer);

module.exports = router;