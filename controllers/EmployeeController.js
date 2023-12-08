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
        res.json({status: "success"});
    } catch (error) {
        res.json({status: "error"});
        console.error("Error", error);
    }
}

//Cập nhật nhân viên
const updateEmployee = async(req, res) =>{
    const idNhanVien = req.params.idNhanVien;
    const {hoVaTen, ngaySinh, gioiTinh, dienThoai, diaChi, anhDaiDien, vaiTro} = req.body;
    console.log(idNhanVien)
    console.log(hoVaTen)
    console.log(ngaySinh)
    console.log(gioiTinh)
    console.log(dienThoai)
    console.log(diaChi)
    console.log(anhDaiDien)
    console.log(vaiTro)

    try {
        const updateResult = await employeeModel.updateEmployee({
            hoVaTen,
            ngaySinh, 
            gioiTinh,
            dienThoai,
            diaChi,
            anhDaiDien,
            vaiTro,
            idNhanVien
        });
        res.json({status: "success", updateResult});
    } catch (error) {
        console.error("Error", error);
    }
}
//Xóa nhân viên
const deleteEmployee = async(req, res) =>{
    try {
        const {idNhanVien} = req.body;
        
        if(!idNhanVien){
            return res.status(400).json({status: "error", message: "parameter is missing or empty."});
        }
        const results = await employeeModel.deleteEmployee(idNhanVien)
        res.json({status: "success", results});
    } catch (error) {
        res.status(500).json({status: "error", error: error.message})
    }
}

module.exports = {
    getAllEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee
}