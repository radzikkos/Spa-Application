var express = require('express');
var router = express.Router();

var client_controller = require('../controllers/clientController')

router.get('/', client_controller.getClients);
router.get('/:id', client_controller.getClientByNameAndSurname);
router.post('/', client_controller.createClient);
router.delete('/:id', client_controller.deleteClient);

module.exports = router;