const db = require ('../database/database');

//Lấy tất cả danh sách nhân viên từ database
const getAllEmployee = async () =>{
    const query = "SELECT * FROM nhanvien WHERE hienThi = 1 AND vaiTro != 'Quản Lý'"
    return await db.queryDatabase(query,[])
}

//Thêm mới nhân viên vào database
const insertEmployee = async(data) =>{
    const query = "INSERT INTO nhanvien (idNhanVien, hoVaTen, matKhau, ngaySinh, gioiTinh, dienThoai, diaChi, anhDaiDien, vaiTro) VALUES (?,?,?,?,?,?,?,?,?)";
    const insertValues = [
        data.idNhanVien,
        data.hoVaTen,
        data.matKhau,
        data.ngaySinh,
        data.gioiTinh,
        data.dienThoai,
        data.diaChi,
        data.anhDaiDien,
        data.vaiTro
    ];
    return await db.queryDatabase(query, insertValues);
}

//Cập nhật nhân viên theo mã nhân viên
const updateEmployee = async(updateData) =>{
    const query = "UPDATE nhanvien SET hoVaTen = ?, ngaySinh =?, gioiTinh = ?, dienThoai = ?, diaChi = ?, anhDaiDien = ?, vaiTro = ? WHERE idNhanVien = ?"
    const updateValues = [
        updateData.hoVaTen,
        updateData.ngaySinh,
        updateData.gioiTinh,
        updateData.dienThoai,
        updateData.diaChi,
        updateData.anhDaiDien,
        updateData.vaiTro,
        updateData.idNhanVien
    ];
    return await db.queryDatabase(query, updateValues);
}

//Xóa nhân viên theo mã nhân viên
const deleteEmployee = (id) =>{
    const query = "UPDATE nhanvien SET hienthi = 0 WHERE idNhanVien = ?"
    return db.queryDatabase(query, [id])
}


module.exports = {
    getAllEmployee,
    insertEmployee,
    updateEmployee,
    deleteEmployee
}