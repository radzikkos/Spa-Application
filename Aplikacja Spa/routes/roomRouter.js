var express = require('express');
var router = express.Router();

var room_controller = require('../controllers/roomController')

router.get('/', room_controller.getRooms);
router.post('/', room_controller.createRoom);
router.delete('/:nr', room_controller.deleteRoom);

module.exports = router;