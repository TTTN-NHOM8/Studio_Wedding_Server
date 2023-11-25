const employeeModel = require('../models/EmployeeModel');

//Lấy tất cả danh sách nhân viên
const getAllEmployee = async(req, res) =>{
    try {
        const employee = await employeeModel.getAllEmployee();
        res.json({status: "success", employeeList:employee});
    }catch(error){
        console.error("Error", error);
    }
}

//Thêm mới nhân viên
const insertEmployee = async(req, res) =>{
    const {idNhanVien, hoVaTen, ngaySinh, gioiTinh, dienThoai, diaChi, anhDaiDien, vaiTro} = req.body;
    const matKhau = "abc";
    console.log(anhDaiDien)
    console.log(vaiTro)
    try {
        await employeeModel.insertEmployee({
            idNhanVien,
            hoVaTen,
            matKhau,
            ngaySinh,
            gioiTinh,
            dienThoai,
            diaChi,
            anhDaiDien,
            vaiTro
        });
        res.json({status: "SUCCESS"});
    } catch (error) {
        console.error("Error", error);
    }
}

//Cập nhật nhân viên
const updateEmployee = async(req, res) =>{
    const idNhanVien = req.params.idNhanVien;
    const {hoVaTen, matKhau, ngaySinh, gioiTinh, dienThoai, diaChi, anhDaiDien, vaiTro} = req.body;
    try {
        const updateResult = await employeeModel.updateEmployee({
            hoVaTen, 
            matKhau, 
            ngaySinh,
            gioiTinh,
            dienThoai,
            diaChi,
            anhDaiDien,
            vaiTro,
            idNhanVien
        });

        if(updateResult.changedRows > 0){
            res.json({status: "SUCCESS"});
        }else{
            res.json({status: "FAILED"});
        }
    } catch (error) {
        console.error("Error", error);
    }
}

module.exports = {
    getAllEmployee,
    insertEmployee,
    updateEmployee
}