var express = require('express');
var router = express.Router();

var data_controller = require('../controllers/dataController')

router.get('/', data_controller.getData);
router.get('/:id', data_controller.getDataByData);
router.post('/', data_controller.createData);
router.delete('/:data', data_controller.deleteData);

module.exports = router;