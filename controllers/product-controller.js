const productModel = require('../models/product-model');

// Lấy tất cả danh sách Sản phẩm 
const getProduct = async (req, res) => {
  try {
    const Product = await productModel.getContracts();
    res.json(Product);
  } catch (error) {
    console.error('Error', error);
  }
}

// Lấy SP by IDSP
const getProductById = async (req, res) => {
  const idSanPham = req.params.idSanPham;
  try {
    const product = await productModel.getContractById(idSanPham);
    res.json(product);
  } catch (error) {
    console.error('Error', error);
  }
}
// Lấy danh sách SP by trangThaiTT
const getProductByPayment = async (req, res) => {
  const trangThai = req.params.trangThai;
  try {
    const product = await productModel.getProductByPayment(trangThai);
    res.json(product);
  } catch (error) {
    console.error('Error', error);
  }
}

// Xoá Sản Phẩm
const deleteProduct = async (req, res) => {
  const idSanPham = req.params.idSanPham;
  const hienThi = 1;
  try {
    const updateResults = await productModel.deleteProduct({
      hienThi,
      idSanPham

    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    console.error('Errorr', error);
  }
}
module.exports = {
  getProduct,
  getProductById,
  getProductByPayment,
  deleteProduct,
}