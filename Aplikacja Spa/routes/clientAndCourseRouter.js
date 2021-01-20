var express = require('express');
var router = express.Router();

var controller = require('../controllers/clientAndCourseController')

router.get('/', controller.getClientsAndCourses);
router.post('/', controller.createClientAndCourse);
router.put('/:id/:data', controller.updateClientAndCourse);
router.delete('/:id/:data', controller.deleteClientAndCourse);

module.exports = router;