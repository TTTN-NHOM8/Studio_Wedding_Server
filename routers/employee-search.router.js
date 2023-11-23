const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');


router.get('/employees', employeeController.getEmployeeName);
router.delete('/employees/:nameEmployee', employeeController.deleteEmployee);
router.get('/employees/role/:roleEmployee', employeeController.getRoleEmployee);

module.exports = router;