const router = require('express').Router();
const controller = require('../controllers/task.controller.js')

router.get("/tasks", controller.readTask)
router.get("/task/employees", controller.readEmployee)
router.get("/employees/:idHDCT", controller.readEmployeeByIdHDCT)

router.post("/tasks/role", controller.readTaskByRole)
router.post("/join/task/employees", controller.readEmployeeByIdTask)
router.post("/insert/employee", controller.insertEmployeeJoin)

router.put("/update/task/:id", controller.updateTask)

router.delete("/delete/task/:id", controller.deleteTask)
router.delete("/delete/employee/:idJoin", controller.deleteJoin)

module.exports = router