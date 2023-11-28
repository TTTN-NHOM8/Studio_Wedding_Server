const db = require('../database/database');

// Lấy danh sách dịch vụ từ database ở trạng thái hiển thị 
const getServices = async () => {
  const query = `SELECT * FROM db_wedding.dichvu WHERE hienThi = 1`;
  return db.queryDatabase(query, []);
}

// Thêm dịch vụ vào database
const insertService = async ({serviceName, servicePrice}) => {
  const query = `INSERT INTO dichvu (tenDichVu, giaThue) VALUES (?, ?)`;
  const values = [
    serviceName, 
    servicePrice
  ];
  return await db.queryDatabase(query, values);
}

// Cập nhật dịch vụ trong database
const updateService = async (data) => {
  const query = `UPDATE dichvu SET tenDichVu = ?, giaThue = ? WHERE idDichVu = ?`;
  const values = [
    data.serviceName, 
    data.servicePrice,
    data.serviceID
  ];
  return await db.queryDatabase(query, values);
}

// Xoá dịch vụ => thực hiện cập nhận hienThi = 0
const removeService = async (serviceID) => {
  const query = `UPDATE dichvu SET hienThi = '0' WHERE idDichVu = ?`;
  return await db.queryDatabase(query, serviceID);
}

module.exports = {
  getServices,
  insertService,
  updateService,
  removeService
}