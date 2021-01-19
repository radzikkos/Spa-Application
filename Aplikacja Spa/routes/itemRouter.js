var express = require('express');
var router = express.Router();

var item_controller = require('../controllers/itemController')

router.get('/', item_controller.getItems);
router.post('/', item_controller.createItem);
router.put('/:name', item_controller.updateItem);
router.delete('/:name', item_controller.deleteItem);

module.exports = router;