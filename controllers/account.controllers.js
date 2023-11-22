const accountmodels = require('../models/account.models');

const LoginAccount = async (req, res) => {
    try {
      const {idNhanVien, passwork, vaitro} = res.body
      const usersAccount = await accountmodels.getUsersAccount(idNhanVien, passwork, vaitro);
      if (usersAccount.length > 0){
        res.json({status : "success", usersAccount})
      }
    } catch (error) {
      console.error('Get Account Failed', error);
      res.json({status : "error", error})
    }
  };
  
  module.exports = {
    LoginAccount
  }