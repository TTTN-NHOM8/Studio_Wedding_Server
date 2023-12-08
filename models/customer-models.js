const database = require("../database/database.js");
//lấy danh sách khách hàng
const getCustomer = async () => {
  const query = "SELECT * FROM khachhang WHERE hienthi = 1";
  return await database.queryDatabase(query, []);
};

//Cập nhật thông tin khách hàng
const updateCustomer = async (data) => {
  const query = ` UPDATE khachHang SET tenKhachHang = ?, dienThoai =? , diaChi=? WHERE idkhachhang = ? `;
  const updateValues = [
    data.tenKhachHang,
    data.dienThoai,
    data.diaChi,
    data.idKhachHang,
  ];
  return await database.queryDatabase(query, updateValues);
};
// tìm kiếm thông tin bằng sdt
const getFindCustomers = async (dienThoai) => {
  const query = `SELECT * FROM khachhang WHERE idkhachhang`;
  return db.queryDatabase(query, [dienThoai]);
};

module.exports = {
  getCustomer,
  updateCustomer,
  getFindCustomers,
};
