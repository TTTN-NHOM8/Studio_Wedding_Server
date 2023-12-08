const router = require('express').Router();
const employee =require('../controllers/EmployeeController');

router.get('/employee', employee.getAllEmployee);
router.post('/employee/add', employee.insertEmployee);
router.put(`/employee/update/:idNhanVien`, employee.updateEmployee);
router.put(`/employee/delete`, employee.deleteEmployee);

module.exports = router;