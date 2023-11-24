const router = require('express').Router();
const controller = require('../controllers/task.controller.js')

router.get("/tasks", controller.readTask)
router.get("/tasks/role", controller.readTaskByRole)

module.exports = router