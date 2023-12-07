const db = require('../database/database');

// lấy tất cả hợp đồng
const getContracts = async () => {
    const query = `SELECT hd.idHopDong, hd.ngayTao, hd.ngayThanhToan, hd.tienCoc, hd.giamGia, hd.tongTien, hd.trangThaiThanhToan, hd.trangThaiHopDong, hd.hienThi, hd.idKhachHang, kh.*,
                        COALESCE(hct.trangThaiPhatSinh, 'Không có phát sinh') AS trangThaiPhatSinh
                    FROM
                        hopdong hd
                    LEFT JOIN (
                        SELECT
                            idHopDong,
                            CASE
                                WHEN COUNT(CASE WHEN trangThaiPhatSinh = 'Có phát sinh' THEN 1 END) > 0
                                THEN 'Có phát sinh'
                                ELSE 'Không có phát sinh'
                            END AS trangThaiPhatSinh
                        FROM
                            hopdongchitiet
                        WHERE
                            hienThi = 1
                            AND idHopDong IS NOT NULL
                        GROUP BY
                            idHopDong
                    ) hct ON hd.idHopDong = hct.idHopDong

                    JOIN khachhang kh ON hd.idKhachHang=kh.idKhachHang
                    WHERE
                        hd.hienThi = 1
                        AND hct.idHopDong IS NOT NULL
                        AND hct.trangThaiPhatSinh IS NOT NULL
                    ORDER BY hd.ngayTao DESC`;
    return db.queryDatabase(query, []);
}

// lấy hợp đồng theo idHD
const getContractById = async (idHopDong) => {
    const query = `SELECT h.*, k.* FROM hopdong h JOIN khachhang k ON h.idKhachHang = k.idKhachHang  WHERE h.idHopDong=?`;
    return db.queryDatabase(query, [idHopDong]);
}

// lấy phát sinh theo idHD
const getIncurrentByIdHD = async (idHopDong) => {
    const query = `SELECT * FROM phatsinh  WHERE idHopDong=? and hienThi=1`;
    return db.queryDatabase(query, [idHopDong]);
}

// thêm hợp đồng mới
const insertContract = async (data) => {
    const query = `INSERT INTO hopdong (idHopDong, ngayThanhToan, tienCoc, giamGia, tongTien, trangThaiThanhToan, trangThaiHopDong, idKhachHang)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const insertValues = [
        data.idHopDong,
        data.ngayThanhToan,
        data.tienCoc,
        data.giamGia,
        data.tongTien,
        data.trangThaiThanhToan,
        data.trangThaiHopDong,
        data.idKhachHang
    ];
    return await db.queryDatabase(query, insertValues);
}

// thêm phát sinh
const insertIncurrent = async (data) => {
    const query = `INSERT INTO phatsinh ( phiPhatSinh, hanTra, noiDung, hienThi, idHopDong)
        VALUES (?, ?, ?, ?, ?)`;
    const insertValues = [
        data.phiPhatSinh,
        data.hanTra,
        data.noiDung,
        data.hienThi,
        data.idHopDong,
    ];
    return await db.queryDatabase(query, insertValues);
}
// Cập nhật trạng thái phát sinh cho hợp đồng
const updateHopDongStatus = async (idHopDong) => {
    const updateQuery = `UPDATE hopdong SET trangThaiPhatSinh = 'Có phát sinh' WHERE idHopDong = ?`;
    const updateValues = [idHopDong];
    return await db.queryDatabase(updateQuery, updateValues);
};
 
// cập nhật hợp đồng
const updateContract = async (data) => {
    const query = `UPDATE hopdong SET ngayThanhToan = ?, giamGia = ?, tongTien = ?, trangThaiThanhToan = ?,trangThaiPhatSinh = ? WHERE idHopDong=?`;
    const updateValues = [
        data.ngayThanhToan,
        data.giamGia,
        data.tongTien,
        data.trangThaiThanhToan,
        data.trangThaiPhatSinh,
        data.idHopDong
    ];
    return await db.queryDatabase(query, updateValues);
}

// xoá hợp đồng
const deleteContract=async(data)=>{
    const query = `UPDATE hopdong SET hienThi=? WHERE idHopDong=?`;
    const updateValues = [
        data.hienThi,
        data.idHopDong
    ];
    return await db.queryDatabase(query, updateValues);
}

// xoá phát sinh
const deleteIncurrent=async(idHopDong)=>{
    const query = `DELETE FROM phatsinh WHERE idHopDong=?`;
    return await db.queryDatabase(query, [idHopDong]);    
}
// lấy danh sách khách hàng
const getClients = async () => {
    const query = `SELECT * FROM khachhang WHERE hienThi=1`;
    return db.queryDatabase(query, []);
}
// lấy danh sách khách hàng
const getDetailContractByIdHDTT = async (idHDTamThoi) => {
    const query = `SELECT t.*, d.tenDichVu, d.giaThue AS giaThueDichVu, p.tenSanPham, p.giaThue AS giaThueSanPham
    FROM hopdongchitiet t LEFT JOIN dichvu d ON d.idDichVu =  t.idDichVu 
    LEFT JOIN sanpham p ON p.idSanPham=t.idSanPham WHERE idHDTamThoi=?`;
    return db.queryDatabase(query, [idHDTamThoi]);
}

// Xoá công việc khi không lưu hợp đồng
const deleteTaskByidHDTamThoi= async (idHDTamThoi)=>{
    const query=`DELETE FROM congviec
    WHERE idHDCT IN (
        SELECT c.idHDCT
        FROM congviec c
        LEFT JOIN hopdongchitiet t ON t.idHopDongChiTiet = c.idHDCT
        WHERE t.idHDTamThoi = ? )`;
    return db.queryDatabase(query,[idHDTamThoi]);
}

// Cập nhật trạng thái sản phẩm khi có phát sinh
const updateProductStatus= async (idHopDong)=>{
    const query=`UPDATE sanpham SET trangThai = 'Có phát sinh'
    WHERE idSanPham IN (
        SELECT sp.idSanPham FROM hopdongchitiet hdct
        JOIN sanpham sp ON hdct.idSanPham = sp.idSanPham
        WHERE hdct.idSanPham IS NOT NULL AND hdct.idHopDong = ?);`;
    return db.queryDatabase(query,[idHopDong]);
}
// Cập nhật trạng thái sản phẩm khi có phát sinh
const updateProductStatusNoneIncurrent= async (idHopDong)=>{
    const query=`UPDATE sanpham SET trangThai = 'Chưa sẵn sàng'
    WHERE idSanPham IN (
        SELECT sp.idSanPham FROM hopdongchitiet hdct
        JOIN sanpham sp ON hdct.idSanPham = sp.idSanPham
        WHERE hdct.idSanPham IS NOT NULL AND hdct.idHopDong = ?);`;
    return db.queryDatabase(query,[idHopDong]);
}
// Cập nhật trạng thái phát sinh of hợp đồng khi tạo phát sinh
const updateIncurrentStatus= async (idHopDong)=>{
    const query=`UPDATE hopdong SET trangThaiPhatSinh = 'Có phát sinh' WHERE idHopDong=?`;
    return db.queryDatabase(query,[idHopDong]);
}
// Cập nhật trạng thái phát sinh of hợp đồng khi xoá phát sinh
const updateIncurrentStatusNone= async (idHopDong)=>{
    const query=`UPDATE hopdong SET trangThaiPhatSinh = 'Không có phát sinh' WHERE idHopDong=?`;
    return db.queryDatabase(query,[idHopDong]);
}

// lấy toàn bộ phát sinh với từng sản phẩm đã thuê
const getAllIncurrent = async(idHopDongTamThoi) =>{
    const query=`SELECT p.*, sp.tenSanPham, sp.anhSanPham AS anh, sp.giaThue, hdct.ngayTra, hdct.ngayThue, hdct.idHopDong
    FROM PhatSinh p
    JOIN hopdongchitiet hdct ON p.idHopDongChiTiet = hdct.idHopDongChiTiet 
    JOIN sanpham sp ON hdct.idSanPham=sp.idSanPham
    WHERE hdct.idHDTamThoi = ?`;
    return db.queryDatabase(query,[idHopDongTamThoi]);
}

// Thêm phát sinh khi thêm HDCT với sản phẩm
const insertNewIncurrent =async (data)=> {
    const query = `INSERT INTO phatsinh (idHopDongChiTiet, idSanPham) VALUES (?, ?)`;
    const insertValues = [
        data.contractDetailID,
        data.productID,
    ];
    return await db.queryDatabase(query, insertValues);    
}
// xoá tất cả phát sinh khi không lưu hợp đồng
const deletePhatSinhByContractIDTemporary = async (contractIDTemporary) => {
    const query = `DELETE FROM PhatSinh WHERE idHopDongChiTiet IN (SELECT p.idHopDongChiTiet
                    FROM PhatSinh p
                    JOIN hopdongchitiet hdct ON p.idHopDongChiTiet = hdct.idHopDongChiTiet
                    WHERE hdct.idHDTamThoi =?)`;
    return await db.queryDatabase(query, [contractIDTemporary]);
}
// Cập nhật phát sinh
const updateIncurrent = async (data) => {
    const query = `UPDATE phatsinh SET noiDung=?, hanTra=?, phiPhatSinh=? WHERE idPhatSinh=?`;
    const updateValues = [
        data.noiDung,
        data.hanTra,
        data.phiPhatSinh,
        data.idPhatSinh
    ];
    return db.queryDatabase(query, updateValues);
}

// Cập nhật phát sinh hienThi=0;
const updateIncurrentVisibleNone = async (data) => {
    const query = `UPDATE phatsinh SET hienThi=0, ngayHoanThanh=NOW()  WHERE idPhatSinh=?`;
    const updateValues = [
        data.idPhatSinh
    ];
    return db.queryDatabase(query, updateValues);
}

// [Xoá]cập nhật lại toàn bộ phát sinh bằng null
const updateIncurrentNone = async (idPhatSinh) => {
    const query = `UPDATE phatsinh SET noiDung=null, hanTra=null, phiPhatSinh=null WHERE idPhatSinh=?`;
    return db.queryDatabase(query,[idPhatSinh]);
}
// cập nhật lại trạng thái sản phẩm sp="có phát sinh" khi cập nhật phát sinh
const updateProductStatusByID= async (idSanPham)=>{
    const query=`UPDATE sanpham SET trangThai = 'Có phát sinh'
    WHERE idSanPham =?;`;
    return db.queryDatabase(query,[idSanPham]);
}

// cập nhật lại trạng thái sản phẩm ="chưa sẵn sàng" khi xoá phát sinh 
const updateProductStatusNoneByID= async (idSanPham)=>{
    const query=`UPDATE sanpham SET trangThai = 'Chưa sẵn sàng'
    WHERE idSanPham =?;`;
    return db.queryDatabase(query,[idSanPham]);
}

// Cập nhật lại trạng thái có phát sinh với những HD có HDCT có phát sinh
const updateStatusIsOncurrentHopDong= async ()=>{
    const query=`UPDATE hopdong hd
    JOIN hopdongchitiet hdct ON hd.idHopDong = hdct.idHopDong
    LEFT JOIN phatsinh ps ON hdct.idHopDongChiTiet = ps.idHopDongChiTiet
    SET hd.trangThaiPhatSinh = 'Có phát sinh'
    WHERE ps.noiDung IS NOT NULL;`;
    return db.queryDatabase(query,[]);

}
// Cập nhật lại trạng thái ko có phát sinh với những HD có HDCT ko có phát sinh
const updateStatusIsNotOncurrentHopDong= async ()=>{
    const query=`UPDATE hopdong hd
    JOIN hopdongchitiet hdct ON hd.idHopDong = hdct.idHopDong
    LEFT JOIN phatsinh ps ON hdct.idHopDongChiTiet = ps.idHopDongChiTiet
    SET hd.trangThaiPhatSinh = 'Không có phát sinh'
    WHERE ps.noiDung IS NULL;`;
    return db.queryDatabase(query,[]);

}

// Thêm trạng thái phát sinh trong HDCT
const updateIsOncurrentStatusContractDetail = async (idHopDongChiTiet)=>{
    const query=`UPDATE hopdongchitiet SET trangThaiPhatSinh = 'Có phát sinh'
    WHERE idHopDongChiTiet =?;`;
    return db.queryDatabase(query,[idHopDongChiTiet]);
}

// Xoá trạng thái phát sinh trong HDCT
const updateIsNotOncurrentStatusContractDetail = async (idHopDongChiTiet)=>{
    const query=`UPDATE hopdongchitiet SET trangThaiPhatSinh = 'Không có phát sinh'
    WHERE idHopDongChiTiet =?;`;
    return db.queryDatabase(query,[idHopDongChiTiet]);
}

// xoá tất cả phát sinh khi không lưu hợp đồng
const deletePhatSinhByIdHDCT = async (contractDetailID) => {
    const query = `DELETE FROM PhatSinh WHERE idHopDongChiTiet=? `;
    return await db.queryDatabase(query, [contractDetailID]);
}
module.exports = {
    getContracts,
    getContractById,
    getIncurrentByIdHD,
    insertContract,
    insertIncurrent,
    updateContract,
    updateHopDongStatus,
    deleteContract,
    deleteIncurrent,
    getClients,
    getDetailContractByIdHDTT,
    deleteTaskByidHDTamThoi,
    updateProductStatus,
    updateProductStatusNoneIncurrent,
    updateIncurrentStatus,
    updateIncurrentStatusNone,
    insertNewIncurrent,
    deletePhatSinhByContractIDTemporary,
    getAllIncurrent,
    updateIncurrent,
    updateIncurrentNone,
    updateProductStatusByID,
    updateProductStatusNoneByID,
    updateStatusIsOncurrentHopDong,
    updateStatusIsNotOncurrentHopDong,
    updateIsOncurrentStatusContractDetail,
    updateIsNotOncurrentStatusContractDetail,
    deletePhatSinhByIdHDCT,
    updateIncurrentVisibleNone

  }
