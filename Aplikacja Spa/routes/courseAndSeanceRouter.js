var express = require('express');
var router = express.Router();

var controller = require('../controllers/courseAndSeanceController')

router.get('/', controller.getCoursesAndSeances);
router.get('/:name', controller.getCourseAndSeancesByCourseName);
router.post('/', controller.createCourseAndSeance);
router.put('/:course_name/:seance_name', controller.updateCourseAndSeance);
router.delete('/:course_name/:seance_name', controller.deleteCourseAndSeance);

module.exports = router;