const router = require('express').Router();
const contract=require('../controllers/contract-controller');

router.get('/contracts',contract.getContracts);
router.get('/contract/:idHopDong',contract.getContractById);
router.get('/contracts/payment',contract.getContractsByPayment);
router.get('/contracts/progess',contract.getContractsByProgess);
router.get('/contracts/incurrent',contract.getContractsByIncurrent);
router.get('/incurrent',contract.getIncurrent);
router.post('/contract/add',contract.insertContract);
router.post('/incurrent/add',contract.insertIncurrent);
router.put('/contract/update/:idHopDong',contract.updateContract);
router.put('/contract/delete/:idHopDong',contract.deleteContract);
router.put('/incurrent/delete/:idPhatSinh',contract.deleteIncurrent);


module.exports=router;