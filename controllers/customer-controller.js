const customerModel = require('../models/customer-models');
//lấy danh sách khách hàng
const getCustomer = async (req, res) => {
    try {
      const customers = await customerModel.getCustomer();
      res.json(customers);
    } catch (error) {
      console.error('Error', error);
    }
  }
  //lây thông tin khách hàng từ sdt
  const getCustomerbyPhone = async () =>{
    const dienThoai = req.params.dienthoai;
    try{
        const customers = await customerModel.getCustomerbyPhone(dienThoai);
        res.json(customers);
    }catch(error){
        console.error('error', error)
    }
  }
  // update khách hàng
  const updateCustomer = async(req, res) =>{
    const idKhachHang= req.params.idKhachHang;
    const{tenKhachHang, dienThoai, diaChi } = req.body;
    try{
        const updateResults = await customerModel.updateCustomer({
            tenKhachHang,
            dienThoai,
            diaChi,
            idKhachHang
        });
    
    if(updateResults.changeRow > 0){
        res.json({
            status: 'success'
        });
    }else{
        res.json({
            status:'failed'
        });
    }
    }catch(error){
        console.error('errorr', error);
    }
}
  module.exports = {
    getCustomer,
    getCustomerbyPhone,
    updateCustomer
  }
