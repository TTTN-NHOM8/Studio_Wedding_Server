const db = require('../database/database');

// Lấy tất cả danh sách HĐCT từ database
const getContractDetails = async () => {
  const query = `SELECT hdct.*, sp.tenSanPham, sp.giaThue AS giaThueSanPham, dv.tenDichVu, dv.giaThue AS giaThueDichVu
  FROM hopdongchitiet hdct
  LEFT JOIN sanpham sp ON hdct.idSanPham = sp.idSanPham
  LEFT JOIN dichvu dv ON hdct.idDichVu = dv.idDichVu;
  `;
  return db.queryDatabase(query, []);
}

// Lấy tất cả danh sách HĐCT từ database với mã HĐ
const getContractDetailsByContractID = async (contractID) => {
  const query = `SELECT * FROM hopdongchitiet WHERE idHopDong=?`;
  return db.queryDatabase(query, [contractID]);
}

// Thêm mới HĐCT với gói sản phẩm vào database
const insertContractDetailWithProduct = async (data) => {
  const query = `INSERT INTO hopdongchitiet (idHopDongChiTiet, ngayThue, ngayTra, idSanPham, idHDTamThoi) VALUES (?, ?, ?, ?, ?);`;
  const values = [
    data.contractDetailID,
    data.dateOfHire,
    data.dateOfReturn,
    data.productID,
    data.contractIDTemporary
  ];
  return await db.queryDatabase(query, values);
}

// Thêm mới HĐCT với gói dịch vụ vào database
const insertContractDetailWithService = async (data) => {
  const query = `INSERT INTO hopdongchitiet (idHopDongChiTiet, diaDiem, ngayThucHien, idDichVu, idHDTamThoi) VALUES (?, ?, ?, ?, ?)`;
  const values = [
    data.contractDetailID,
    data.location,
    data.dateOfPerform,
    data.serviceID,    
    data.contractIDTemporary
  ];
  return await db.queryDatabase(query, values);
}

// Cập nhật mã hợp đồng cho HĐCT
const updateContractDetailContractID = async (data) => {
  const query = `UPDATE hopdongchitiet SET idHopDong = ? WHERE idHopDongChiTiet = ?`;
  const values = [
    data.contractID,
    data.contractDetailID
  ];
  return await db.queryDatabase(query, values);
}

// Cập nhật HĐCT với gói sản phẩm
const updateContractDetailWithProduct = async (data) => {
  const query = `UPDATE hopdongchitiet SET ngayThue = ?, ngayTra = ?, idSanPham = ? WHERE idHopDongChiTiet = ?`;
  const values = [
    data.dateOfHire,
    data.dateOfReturn,
    data.productID,
    data.contractDetailID
  ];
  return await db.queryDatabase(query, values);
}

// Cập nhật HĐCT với gói dịch vụ
const updateContractDetailWithService = async (data) => {
  const query = `UPDATE hopdongchitiet SET diaDiem = ?, ngayThucHien = ?, idDichVu = ? WHERE idHopDongChiTiet = ?`;
  const values = [
    data.location,
    data.dateOfPerform,
    data.serviceID,
    data.contractDetailID
  ];
  return await db.queryDatabase(query, values);
}

// Xoá HĐCT theo mã HĐCT
const removeContractDetail = async (contractDetailID) => {
  const query = `DELETE FROM hopdongchitiet WHERE idHopDongChiTiet =? `;
  return db.queryDatabase(query, [contractDetailID]);
}

module.exports = {
  getContractDetails,
  getContractDetailsByContractID,
  insertContractDetailWithProduct,
  insertContractDetailWithService,
  updateContractDetailContractID,
  updateContractDetailWithProduct,
  updateContractDetailWithService,
  removeContractDetail
}