var express = require('express');
var router = express.Router();

var price_controller = require('../controllers/priceController')

router.get('/', price_controller.getPrices);
router.post('/', price_controller.createPrice);
router.delete('/:price', price_controller.deletePrice);

module.exports = router;