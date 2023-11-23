const searchemployeeModel = require('../models/employee-search.model');

// Tìm nhân viên theo tên
const getEmployeeName = async (req, res) => {
    try {
      const employee = await searchemployeeModel.getEmployeeByName();
      res.json(employee);
    } catch (error) {
      console.error('Get Name Employee Failed ', error);
    }
}

// Xoá nhân viên
const deleteEmployee = async (req, res) => {
    const nameEmployee = req.params.nameEmployee;
    const hienThi = 1;
    try {
      const updateResults = await searchemployeeModel.deleteEmployee({
        hienThi,
        nameEmployee,
      });

      if (updateResults.changedRows > 0) {
        res.json({ status: 'success' });
      } else {
        res.json({ status: 'failed' });
      }
    } catch (error) {
      console.error('Delete Employee Failed', error);
    }
}

// Lọc nhân viên theo vai trò
const getRoleEmployee = async (req, res) => {
    const roleEmployee = req.params.roleEmployee;
    try {
      const employee = await searchemployeeModel.getEmployeeByRole(roleEmployee);
      res.json(employee);
    } catch (error) {
      console.error('Get Role Employee Failed', error);
    }
}

module.exports = {
  getEmployeeName,
  deleteEmployee,
  getRoleEmployee,
};
