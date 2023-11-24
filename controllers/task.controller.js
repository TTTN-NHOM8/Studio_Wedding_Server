const model = require('../models/task.model.js')

const readTask = async (req, res) => {
    try {
        const results = await model.readTask()
        res.json({ status: "success", taskList: results })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

const readTaskByRole = async (req, res) => {
    try {
        const { role } = req.query

        if (!role) {
            return res.status(400).json({ status: "error", message: "'role' parameter is missing or empty." });
        }

        const results = await model.readTaskByRole(role)
        res.json({ status: "success", taskList: results })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

module.exports = {
    readTask,
    readTaskByRole
}