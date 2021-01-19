var express = require('express');
var router = express.Router();

var item_controller = require('../controllers/itemUsedInSeanceController')

router.get('/', item_controller.getItemUsedInSeance);
router.post('/', item_controller.createItemUsedInSeance);
router.put('/:seance_name/:item_name', item_controller.updateItemUsedInSeance);
router.delete('/:seance_name/:item_name', item_controller.deleteItemUsedInSeance);

module.exports = router;