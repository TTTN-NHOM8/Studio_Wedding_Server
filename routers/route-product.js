const router = require('express').Router();
const product=require('../controllers/product-controller');

router.get('/product',product.getProduct);            
router.get('/product/:idHopDong',product.getProductById);               
router.get('/product/payment/:trangThai',product.getProductByPayment);
router.put('/product/delete/:idSanPham',product.deleteProduct);

module.exports=router;