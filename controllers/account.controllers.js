const accountmodels = require("../models/account.models");

const LoginAccount = async (req, res) => {
  try {
    const { idNhanVien, matKhau } = req.body;
    const usersAccount = await accountmodels.LoginAccount({
      idNhanVien,
      matKhau,
    });

    if (usersAccount.length > 0) {
      res.json({ status: "success", userAccount: usersAccount[0] });
    } else {
      res.status(401).json({ status: "error", error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Get Account Failed", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

//doimatkhau
const ChangePasswordController = async (req, res) => {
  try {
    const { idNhanVien, matKhauCu, matKhauMoi } = req.body;
    const result = await accountmodels.ChangePassword({
      idNhanVien,
      matKhauCu,
      matKhauMoi,
    });

    const response = { status: "success" };

    if (result.success && result.message !== null) {
      response.message = result.message;
    }

    res.json(response);
  } catch (error) {
    console.error("Change Password Failed", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const UpdateEmployeeInfoController = async (req, res) => {
  try {
    const {
      idNhanVien,
      hoVaTen,
      ngaySinh,
      gioiTinh,
      dienThoai,
      diaChi,
      vaiTro,
    } = req.body;
    await accountmodels.UpdateEmployeeInfo({
      idNhanVien,
      hoVaTen,
      ngaySinh,
      gioiTinh,
      dienThoai,
      diaChi,
      vaiTro,
    });

    res.json({ status: "success" });
  } catch (error) {
    console.error("Update Employee Info Failed", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
      details: error.message,
    });
  }
};
const Getthongtin = async (req, res) => {
  try {
    const idNhanVien = req.params.idNhanVien;

    // Lấy thông tin nhân viên sau khi cập nhật thành công
    const allthongtin = await accountmodels.getThongtinid(idNhanVien);
    console.log(allthongtin);

    if (allthongtin) {
      res.json({ status: "success", allthongtin });
    } else {
      res.status(404).json({ status: "error", error: "Employee not found" });
    }
  } catch (error) {
    console.error("Get Updated Employee Info Failed", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const GetDailyRevenueController = async (req, res) => {
  try {
    const { ngay } = req.params;

    // Gọi hàm getDailyRevenue từ mô hình accountmodels
    const totalRevenue = await accountmodels.getDailyRevenue(ngay);

    res.json({ status: "success", totalRevenue });
  } catch (error) {
    console.error("Get Daily Revenue Failed", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const GetDailyRevenueControllerMonth = async (req, res) => {
  try {
    const { thang } = req.params;

    // Gọi hàm getDailymonth từ mô hình accountmodels
    const doanhthuthang = await accountmodels.getDailymonth(thang);
    res.json({ status: "success", doanhthuthang });
  } catch (error) {
    console.error("Get Daily Revenue Failed", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const GetDailyRevenueControllerYert = async (req, res) => {
  try {
    const { nam } = req.params;

    // Gọi hàm getDailymonth từ mô hình accountmodels
    const doanhthunam = await accountmodels.getDailyyerd(nam);
    res.json({ status: "success", doanhthunam });
  } catch (error) {
    console.error("Get Daily Revenue Failed", error);
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

module.exports = {
  LoginAccount,
  ChangePasswordController,
  UpdateEmployeeInfoController,
  Getthongtin,
  GetDailyRevenueController,
  GetDailyRevenueControllerMonth,
  GetDailyRevenueControllerYert,
  GetDailyRevenueControllerYert,
};
