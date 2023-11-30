const router = require('express').Router();
const serviceController = require('../controllers/service.controller.js');

router.get('/services', serviceController.getServices);
router.post('/services', serviceController.insertService);
router.put('/services/:serviceID/update', serviceController.updateService);
router.put('/services/:serviceID/delete', serviceController.removeService);

module.exports = router;