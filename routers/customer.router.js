const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customer.controller");

router.post("/insertCustomer", CustomerController.insertCustomer);
router.put("/customers/:customerId", CustomerController.deleteCustomer);

module.exports = router;
