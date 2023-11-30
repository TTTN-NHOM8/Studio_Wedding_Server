const model = require('../models/task.model.js')

const readTask = async (req, res) => {
    try {
        const results = await model.readTask()

        if (results.length > 0) {
            res.json({ status: "success", taskList: results })
        } else {
            res.json({ status: "not found", taskList: results })
        }

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

        if (results.length > 0) {
            res.json({ status: "success", taskList: results })
        } else {
            res.json({ status: "not found", taskList: results })
        }
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

const readEmployeeByIdHDCT = async (req, res) => {
    try {
        const { idHDCT } = req.params

        if (!idHDCT) {
            return res.status(400).json({ status: "error", message: " parameter is missing or empty." });
        }

        const results = await model.readEmployeeByIdHDCT(idHDCT)

        if (results.length > 0) {
            res.json({ status: "success", employeeList: results })
        } else {
            res.json({ status: "not found", employeeList: results })
        }
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

const readEmployeeByRole = async (req, res) => {
    try {
        const { role } = req.body
        if (!role) {
            return res.status(400).json({ status: "error", message: " parameter is missing or empty." });
        }

        const results = await model.readEmployeeByRole(role)

        if (results.length > 0) {
            res.json({ status: "success", employeeList: results })
        } else {
            res.json({ status: "not found", employeeList: results })
        }
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

const readEmployee = async (req, res) => {
    try {

        const results = await model.readEmployee()

        if (results.length > 0) {
            res.json({ status: "success", employeeList: results })
        } else {
            res.json({ status: "not found", employeeList: results })
        }

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

const insertEmployeeJoin = async (req, res) => {
    try {
        const { idTask, idEmployee } = req.body

        if (!idTask || !idEmployee) {
            return res.status(400).json({ status: "error", message: " parameter is missing or empty." });
        }
        console.log('Results',idEmployee,idTask);

        const results = await model.insertEmployeeJoin(idTask, idEmployee)
        res.json(results)
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
}

const updateTask = async (req, res) => {

    try {
        const id = req.params.id;
        const { statusTask } = req.body

        if (!id || !statusTask) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }

        const results = await model.updateTask(id, statusTask)
        res.json({ status: "success", results })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }

}

const deleteJoin = async (req, res) => {

    try {
        const { idJoin } = req.params;

        if (!idJoin) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }

        const results = await model.deleteJoin(idJoin)
        res.json({ status: "success", results })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }

}

const deleteTask = async (req, res) => {

    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ status: "error", message: "parameter is missing or empty." });
        }

        const results = await model.deleteTask(id)
        res.json({ status: "success", results })
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }

}
module.exports = {
    readTask,
    readTaskByRole,
    updateTask,
    deleteTask,
    readEmployeeByIdHDCT,
    insertEmployeeJoin,
    deleteJoin,
    readEmployeeByRole,
    readEmployee
}