var express = require('express');
var router = express.Router();

var course_controller = require('../controllers/courseController')

router.get('/', course_controller.getCourses);
router.get('/:name', course_controller.getCourseByName);
router.post('/', course_controller.createCourse);
router.put('/:name', course_controller.updateCourse);
router.delete('/:name', course_controller.deleteCourse);

module.exports = router;