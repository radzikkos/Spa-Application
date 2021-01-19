var express = require('express');
var router = express.Router();

var seance_controller = require('../controllers/seanceController');
const { route } = require('./itemRouter');

router.get('/', seance_controller.getSeances);
router.get('/:name', seance_controller.getSeanceByName);
router.post('/', seance_controller.createSeance);
router.put('/:type', seance_controller.updateSeance);
router.delete('/:type', seance_controller.deleteSeance);

router.get('/seanceEmployees/:name', seance_controller.getSeanceEmployees)
module.exports = router;