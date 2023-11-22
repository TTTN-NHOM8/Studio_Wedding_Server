const db = require("../database/database");

const LoginAccount = async (androidData) => {
    
    const { idNhanVien, matKhau, vaiTro } = androidData;
    const query = `SELECT * FROM nhanvien WHERE idNhanVien = ? AND matKhau = ? AND vaiTro = ? `;
    return db.queryDatabase(query, [androidData]);
  };
  
module.exports = {
    LoginAccount
}

