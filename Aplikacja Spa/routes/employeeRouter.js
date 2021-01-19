var express = require('express');
var router = express.Router();

var employee_controller = require('../controllers/employeeController')

router.get('/', employee_controller.getEmployees);
router.get('/:id', employee_controller.getEmployeeById);
router.post('/', employee_controller.createEmployee);
router.put('/:id', employee_controller.updateEmployee);
router.delete('/:id', employee_controller.deleteEmployee);

module.exports = router;