const Customer = require("../models/customer.model");

const insertCustomer = async (req, res) => {
  try {
    const { tenKhachHang, dienThoai, diaChi } = req.body;

    const result = await Customer.insertCustomer(
      tenKhachHang,
      dienThoai,
      diaChi
    );
    res.json({ status: "sussces", result });
  } catch (error) {
    res.json({ status: "error", error });
  }
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.idKhachHang;

  try {
    const result = await Customer.softDeleteCustomer(customerId);
    res.json({
      success: true,
      message: `Khách hàng có ID ${customerId} đã được xóa!`,
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Xóa khách hàng không thành công!",
      error: error.message,
    });
  }
};

module.exports = {
  insertCustomer,
  deleteCustomer,
};
