var express = require('express');
var router = express.Router();

var controller = require('../controllers/raportController')

router.get('/raport1', controller.getRaport1);
router.get('/raport2', controller.getRaport2);
router.get('/raport3', controller.getRaport3);
router.get('/raport4', controller.getRaport4);
router.get('/raport5', controller.getRaport5);

module.exports = router;