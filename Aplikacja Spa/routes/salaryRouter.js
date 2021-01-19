var express = require('express');
var router = express.Router();

var salary_controller = require('../controllers/salaryController')

router.get('/', salary_controller.getSalaries);
router.post('/', salary_controller.createSalary);
router.put('/:previous_salary', salary_controller.updateSalary);
router.delete('/:salary', salary_controller.deleteSalary);

module.exports = router;