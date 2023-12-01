// Trong file account.models.js
const db = require("../database/database");

const LoginAccount = async ({ idNhanVien, matKhau }) => {
  try {
    const query = `SELECT idNhanVien, vaiTro, hoVaTen, dienThoai, diaChi, ngaySinh, gioiTinh FROM nhanvien WHERE idNhanVien = ? AND matKhau = ?`;
    const usersAccount = await db.queryDatabase(query, [idNhanVien, matKhau]);
    return usersAccount;
  } catch (error) {
    throw error;
  }
};

const ChangePassword = async ({ idNhanVien, matKhauMoi }) => {
  try {
    const updatePasswordQuery = `UPDATE nhanvien SET matKhau = ? WHERE idNhanVien = ?`;
    await db.queryDatabase(updatePasswordQuery, [matKhauMoi, idNhanVien]);
    return updatePasswordQuery;
  } catch (error) {
    throw error;
  }
};
const UpdateEmployeeInfo = async ({
  idNhanVien,
  hoVaTen,
  ngaySinh,
  gioiTinh,
  dienThoai,
  diaChi,
  vaiTro,
}) => {
  try {
    const updateEmployeeQuery = `
      UPDATE nhanvien 
      SET hoVaTen = ?, ngaySinh = ?, gioiTinh = ? ,  dienThoai = ?, diaChi = ?,  vaiTro = ? 
      WHERE idNhanVien = ?
    `;
    await db.queryDatabase(updateEmployeeQuery, [
      hoVaTen,
      ngaySinh,
      gioiTinh,
      dienThoai,
      diaChi,
      vaiTro,
      idNhanVien,
    ]);

    return updateEmployeeQuery;
  } catch (error) {
    throw error;
  }
};
const getThongtinid = async (idNhanVien) => {
  try {
    const query = "SELECT * FROM nhanvien WHERE idNhanVien = ?";
    const allthongtin = await db.queryDatabase(query, [idNhanVien]);
    console.log(allthongtin);
    if (allthongtin.length > 0) {
      return allthongtin[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
//doanhthungay

const getDailyRevenue = async (ngay) => {
  try {
    const getRevenueQuery = `
    SELECT COUNT(DISTINCT idHopDong) AS soluong,
    SUM(tongTien) AS totalRevenue
    FROM hopdong
    WHERE ngayThanhToan = ?;
    `;
    const result = await db.queryDatabase(getRevenueQuery, [ngay]);
    return result[0].totalRevenue || 0;
  } catch (error) {
    throw error;
  }
};
//doanhthuthang
const getDailymonth = async (thang) => {
  try {
    // Parse thang string to create a Date object
    const thangDate = new Date(thang);

    const getRevenueQuery = `
      SELECT 
        SUM(tongTien) AS doanhthuthang 
      FROM 
        hopdong 
      WHERE 
        MONTH(ngayThanhToan) = ? AND YEAR(ngayThanhToan) = ?;
    `;

    // Use getUTCMonth() and getUTCFullYear() to ensure correct results
    const result = await db.queryDatabase(getRevenueQuery, [
      thangDate.getUTCMonth() + 1,
      thangDate.getUTCFullYear(),
    ]);
    return result[0].doanhthuthang || 0;
  } catch (error) {
    throw error;
  }
};

const getDailyyerd = async (nam) => {
  try {
    // Parse thang string to create a Date object
    const namDate = new Date(nam);

    const getRevenueQuery = `
      SELECT 
        SUM(tongTien) AS doanhthunam 
      FROM 
        hopdong 
      WHERE 
         YEAR(ngayThanhToan) = ?;
    `;

    const result = await db.queryDatabase(getRevenueQuery, [
      namDate.getUTCFullYear(),
    ]);
    return result[0].doanhthunam || 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  LoginAccount,
  ChangePassword,
  UpdateEmployeeInfo,
  getThongtinid,
  getDailyRevenue,
  getDailymonth,
  getDailyyerd,
};
