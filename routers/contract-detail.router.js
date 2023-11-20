const router = require('express').Router();
const contractDetailController = require('../controllers/contract-detail.controller.js');

router.get('/contract-details', contractDetailController.getContractDetails);
router.get('/contract-details/:contractID', contractDetailController.getContractDetailsByContractID);
router.post('/contract-details/with-product', contractDetailController.insertContractDetailWithProduct);
router.post('/contract-details/with-service', contractDetailController.insertContractDetailWithService);
router.put('/contract-details/:contractDetailID/contract', contractDetailController.updateContractDetailContractID);
router.put('/contract-details/:contractDetailID/with-product', contractDetailController.updateContractDetailWithProduct);
router.put('/contract-details/:contractDetailID/with-service', contractDetailController.updateContractDetailWithService);
router.delete('/contract-details/:contractDetailID', contractDetailController.removeContractDetail);

module.exports = router;