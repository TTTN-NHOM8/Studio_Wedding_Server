const database = require('../database/database.js')

const readTask = async () => {
    const query = "SELECT " +
        "c.idCongViec, " +
        "hdct.idHopDong, " +
        "hdct.idHopDongChiTiet, " +
        "nv.vaiTro, " +
        "MAX(ngayThucHien) AS ngayThucHien, " +
        "MAX(trangThaiCongViec) AS trangThaiCongViec, " +
        "MAX(tenDichVu) AS tenDichVu, " +
        "MAX(diaDiem) AS diaDiem, " +
        "REPLACE(GROUP_CONCAT(DISTINCT hoVaTen), ',', ', ') AS hoVaTen " +
        "FROM db_wedding.congviec c " +
        "LEFT JOIN db_wedding.thamgia t ON t.idCongViec = c.idCongViec " +
        "LEFT JOIN db_wedding.hopdongchitiet hdct ON c.idHDCT = hdct.idHopDongChiTiet " +
        "LEFT JOIN db_wedding.dichvu d ON hdct.idDichVu = d.idDichVu " +
        "LEFT JOIN db_wedding.nhanvien nv ON t.idNhanVien = nv.idNhanVien " +
        "WHERE c.hienThi = 1 " +
        "GROUP BY idHopDongChiTiet "
    return await database.queryDatabase(query, [])
}

const readTaskByRole = async (role) => {

    const query = "SELECT " +
        "c.idCongViec, " +
        "hdct.idHopDong, " +
        "hdct.idHopDongChiTiet, " +
        "nv.vaiTro, " +
        "MAX(ngayThucHien) AS ngayThucHien, " +
        "MAX(trangThaiCongViec) AS trangThaiCongViec, " +
        "MAX(tenDichVu) AS tenDichVu, " +
        "MAX(diaDiem) AS diaDiem, " +
        "REPLACE(GROUP_CONCAT(DISTINCT hoVaTen), ',', ', ') AS hoVaTen " +
        "FROM db_wedding.congviec c " +
        "LEFT JOIN db_wedding.thamgia t ON t.idCongViec = c.idCongViec " +
        "LEFT JOIN db_wedding.hopdongchitiet hdct ON c.idHDCT = hdct.idHopDongChiTiet " +
        "LEFT JOIN db_wedding.dichvu d ON hdct.idDichVu = d.idDichVu " +
        "LEFT JOIN db_wedding.nhanvien nv ON t.idNhanVien = nv.idNhanVien " +
        "WHERE c.hienThi = 1 AND nv.vaiTro = ? " +
        "GROUP BY idHopDongChiTiet "

    return await database.queryDatabase(query, [role])
}

const readEmployeeByIdHDCT = async (idHDCT) => {
    const query = "SELECT nv.*, t.idThamGia " +
        "FROM db_wedding.congviec c " +
        "LEFT JOIN db_wedding.thamgia t ON t.idCongViec = c.idCongViec " +
        "LEFT JOIN db_wedding.hopdongchitiet hdct ON c.idHDCT = hdct.idHopDongChiTiet " +
        "LEFT JOIN db_wedding.nhanvien nv ON t.idNhanVien = nv.idNhanVien " +
        "WHERE c.idHDCT = ? AND c.hienThi = 1 "

    return await database.queryDatabase(query, [idHDCT])
}

const readEmployeeByIdTask = async (idTask) => {
    const query = "SELECT nhanvien.* " +
        "FROM nhanvien " +
        "LEFT JOIN thamgia ON nhanvien.idNhanVien = thamgia.idNhanVien AND thamgia.idCongViec = ? " +
        "WHERE thamgia.idNhanVien IS NULL AND nhanvien.vaiTro != 'Quản Lý'"


    return await database.queryDatabase(query, [idTask])
}


const readEmployee = async () => {
    // const query = ` SELECT * FROM NhanVien WHERE hienThi = 1 AND NOT EXISTS (
    //     SELECT 1
    //     FROM ThamGia
    //     WHERE ThamGia.idNhanVien = NhanVien.idNhanVien
    //   )`

    const query = "SELECT nhanvien.* " +
        "FROM nhanvien " +
        "LEFT JOIN thamgia ON nhanvien.idNhanVien = thamgia.idNhanVien AND thamgia.idCongViec = 40 " +
        "WHERE thamgia.idNhanVien IS NULL "

    return await database.queryDatabase(query, [])
}

const insertEmployeeJoin = async (idTask, idEmployee) => {
    const insertQuery = "INSERT INTO ThamGia(idCongViec, idNhanVien) VALUES(?, ?)";
    const selectQuery = "SELECT * FROM ThamGia WHERE idCongViec = ? AND idNhanVien = ?";

    try {
        // Bắt đầu giao dịch
        await database.queryDatabase("START TRANSACTION");

        await database.queryDatabase(insertQuery, [idTask, idEmployee]);

        const results = await database.queryDatabase(selectQuery, [idTask, idEmployee]);

        await database.queryDatabase("COMMIT");


        // Trả về kết quả thành công
        return { status: "success", idTask: results[0].idThamGia }

    } catch (err) {
        // Rollback giao dịch nếu có lỗi
        await database.queryDatabase("ROLLBACK");
        // Trả về kết quả lỗi và thông điệp lỗi
        return { status: "ERROR", err };
    }

}

const deleteJoin = async (idJoin) => {
    const query = "DELETE FROM ThamGia WHERE idThamGia = ?"
    return await database.queryDatabase(query, [idJoin])
}

const deleteTask = async (id) => {
    const query = "UPDATE CongViec SET hienThi = 0 WHERE idCongViec = ?"
    return await database.queryDatabase(query, [id])
}

const updateTask = async (id, statusTask) => {
    const query = "UPDATE CongViec SET trangThaiCongViec = ? WHERE idCongViec = ?"
    return await database.queryDatabase(query, [statusTask, id])
}


module.exports = {
    readTask,
    readTaskByRole,
    deleteTask,
    updateTask,
    readEmployeeByIdHDCT,
    insertEmployeeJoin,
    deleteJoin,
    readEmployeeByIdTask,
    readEmployee
}