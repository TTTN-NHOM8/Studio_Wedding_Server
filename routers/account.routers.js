
const router = require('express').Router();
const accountControllers = require('../controllers/account.controllers.js');


router.post('/acconut/androidData', accountControllers.LoginAccount);


module.exports = router;