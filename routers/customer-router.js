const router = require('express').Router();
const customer=require('../controllers/customer-controller');

router.get('/customer',customer.getCustomer);
router.put('/customer/update/:idKhachHang',customer.updateCustomer);
module.exports = router;