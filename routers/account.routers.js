const router = require("express").Router();
const accountControllers = require("../controllers/account.controllers.js");

router.post("/account/Login", accountControllers.LoginAccount);
router.post(
  "/account/changePassword",
  accountControllers.ChangePasswordController
);
router.post("/account/update", accountControllers.UpdateEmployeeInfoController);
router.get(
  "/account/get-updated-info/:idNhanVien",
  accountControllers.Getthongtin
);
router.get(
  "/getDailyRevenue/:ngay",
  accountControllers.GetDailyRevenueController
);
router.get(
  "/getDailyRevenueMonth/:thang",
  accountControllers.GetDailyRevenueControllerMonth
);
router.get(
  "/getDailyRevenueYert/:nam",
  accountControllers.GetDailyRevenueControllerYert
);

module.exports = router;
