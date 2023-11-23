const db = require('../database/database');
// xoá nhân vien
const deleteEmployee = async (data) => {
    const query = `UPDATE nhanvien SET hienThi=? WHERE nameNhanVien=?`;
    const updateValues = [
        data.hienThi,
        data.nameEmployee
    ];
    return await db.queryDatabase(query, updateValues);
}
// Lọc nhân viên theo vai trò
const getRoleEmployee = async (roleEmployee) => {
    const query = `SELECT * FROM nhanvien h JOIN nhanvien k ON h.roleNhanVie = k.roleNhanVien WHERE h.roleEmployee=?`;
    return db.queryDatabase(query, [roleEmployee]);
}
// TÌm nhân viên
const getEmployeeName = async () => {
    const query = `SELECT * FROM nhanvien WHERE hienThi=1`;
    return db.queryDatabase(query, []);
}
module.exports = {
    deleteEmployee,
    getRoleEmployee,
    getEmployeeName,
}