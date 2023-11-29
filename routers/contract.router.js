const router = require('express').Router();
const contract=require('../controllers/contract-controller');

// Hợp đồng
router.get('/contracts',contract.getContracts);
router.get('/contract/:idHopDong',contract.getContractById);
router.get('/contracts/detail-contract/:idHDTamThoi',contract.getDetailContractByIdHDTT);
router.post('/contract/add',contract.insertContract);
router.put('/contract/update/:idHopDong',contract.updateContract);
router.put('/contract/delete/:idHopDong',contract.deleteContract);

// Phát sinh
router.get('/incurrent/incurrentList/:idHopDong',contract.getAllIncurrent);
router.put('/incurrent/update/:idPhatSinh',contract.updateInCurrent);
router.put('/incurrent/update/none/:idPhatSinh',contract.updateIncurrentNone);

// Route liên quan
router.get('/contracts/clients',contract.getAllClients);
router.delete('/contract/task/delete/:idHDTamThoi',contract.deleteTaskByidHDTamThoi);


module.exports=router;