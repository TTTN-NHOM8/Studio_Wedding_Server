const database = require("../database/database.js");

const insertCustomer = async (tenKhachHang, dienThoai, diaChi) => {
  const query = `INSERT INTO khachhang (tenKhachHang, dienThoai, diaChi) VALUES (?, ?, ?);`;
  return await database.queryDatabase(query, [tenKhachHang, dienThoai, diaChi]);
};

const softDeleteCustomer = async (customerId) => {
  const query = `UPDATE khachhang SET hienThi = 0 WHERE idKhachHang = ?`;

  try {
    const result = await database.queryDatabase(query, [customerId]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  insertCustomer,
  softDeleteCustomer,
};
