const db = require('../database/database');

// lấy tất cả sản phẩm
const getProduct = async () => {
    const query = `SELECT h.*, k.* FROM sanpham h JOIN sanpham k ON h.idSanPham = k.idSanPham WHERE h.hienThi=1 ORDER BY h.ngayTao DESC`;
    return db.queryDatabase(query, []);
}

// lấy sanpham theo idSanPham
const getProductById = async (idSanPham) => {
    const query = `SELECT h.*, k.* FROM sanpham h JOIN sanpham k ON h.idSanPham = k.idSanPham  WHERE h.idSanPham=?`;
    return db.queryDatabase(query, [idSanPham]);
}

// lấy sản phẩm theo trạng thái thanh toán
const getProductByPayment = async (trangThai) => {
    const query = `SELECT h.*, k.* FROM sanpham h JOIN sanpham k ON h.idSanPham = k.idSanPham WHERE h.trangThai=?`;
    return db.queryDatabase(query, [trangThai]);
}


// xoá hợp đồng
const deleteProduct=async(data)=>{
    const query = `UPDATE sanpham SET(hienThi=?) WHERE idSanPham=?`;
    const updateValues = [
        data.hienThi,
        data.idSanPham
    ];
    return await db.queryDatabase(query, updateValues);
}



module.exports = {
    
    getProduct,
    getProductById,
    getProductByPayment,
    deleteProduct,
  }