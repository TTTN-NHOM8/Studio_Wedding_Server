const contractDetailModel = require('../models/contract-detail.model.js');
const contracModel = require('../models/contract-model');

// Lấy tất cả danh sách HĐCT
const getContractDetails = async (req, res) => {
  try {
    const contractDetails = await contractDetailModel.getContractDetails();
    res.json(contractDetails);
  } catch (error) {
    console.error('Get Contract Details Failed', error);
  }
}

// Lấy tất cả danh sách HĐCT theo mã Hợp Đồng
const getContractDetailsByContractID = async (req, res) => {
  const contractID = req.params.contractID;
  try {
    const contractDetails = await contractDetailModel.getContractDetailsByContractID(contractID);
    res.json(contractDetails);
  } catch (error) {
    console.error('Get Contract Details By Contract ID Failed', error);
  }
}

// Lấy tất cả danh sách HĐCT với mã HĐ tạm thời từ database
const getContractDetailsByContractIDTemporary = async (req, res) => {
  const contractIDTemporary = req.params.contractIDTemporary;
  try {
    const contractDetails = await contractDetailModel.getContractDetailsByContractIDTemporary(contractIDTemporary);
    res.json(contractDetails);
  } catch (error) {
    console.error('Get Contract Details By Contract ID Failed Temporary', error);
  }
}

// Thêm mới HĐCT với gói sản phẩm 
const insertContractDetailWithProduct = async (req, res) => {
  const { contractDetailID, dateOfHire, dateOfReturn, productID, contractIDTemporary } = req.body;
  try {
    await contractDetailModel.insertContractDetailWithProduct({
      contractDetailID,
      dateOfHire,
      dateOfReturn,
      productID,
      contractIDTemporary
    });

    // Cập nhật sản phẩm thành trạng thái "Đang thuê"
    await contractDetailModel.updateStatusHiredIntoProductByProductID(productID);

    // thêm phát sinh liên quan đến sản phẩm khi thêm HĐCT với sản phẩm 
    await contracModel.insertNewIncurrent({ contractDetailID, productID });

    res.json({ status: 'success' });
  } catch (error) {
    res.json({ status: 'error' });
    console.error('Insert Contract Detail With Product Failed', error);
  }
}

// Thêm mới HĐCT với gói dịch vụ 
const insertContractDetailWithService = async (req, res) => {
  const { contractDetailID, location, dateOfPerform, serviceID, contractIDTemporary } = req.body;
  try {
    await contractDetailModel.insertContractDetailWithService({
      contractDetailID,
      location,
      dateOfPerform,
      serviceID,
      contractIDTemporary
    });
    // Thêm công việc của dịch vụ ngay sau khi thêm HĐCt
    await contractDetailModel.insertTaskWithContractDetailService(contractDetailID);
    res.json({ status: 'success' });
  } catch (error) {
    res.json({ status: 'error' });
    console.error('Insert Contract Detail With Service Failed', error);
  }
}

// Cập nhật mã hợp đồng cho HĐCT theo mã HĐ tạm thời
const updateContractDetailContractID = async (req, res) => {
  const contractIDTemporary = req.params.contractIDTemporary;
  const contractID = req.body.idHopDong;
  try {
    const updateResults = await contractDetailModel.updateContractDetailContractID({
      contractID,
      contractIDTemporary
    });


    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failure' });
    }
  } catch (error) {
    res.json({ status: 'error' });
    console.error('Update Contract Detail Contract ID Failed', error);
  }
}

// Cập nhật HĐCT với gói sản phẩm
const updateContractDetailWithProduct = async (req, res) => {
  const contractDetailID = req.params.contractDetailID;
  const { dateOfHire, dateOfReturn, productID } = req.body;
  try {
    const updateResults = await contractDetailModel.updateContractDetailWithProduct({
      contractDetailID,
      dateOfHire,
      dateOfReturn,
      productID
    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success', rs: updateResults });
    } else {
      res.json({ status: 'failure', rs: updateResults });
    }
  } catch (error) {
    res.json({ status: 'error' });
    console.error('Update Contract Detail With Product Failed', error);
  }
}

// Cập nhật HĐCT với gói dịch vụ
const updateContractDetailWithService = async (req, res) => {
  const contractDetailID = req.params.contractDetailID;
  const { dateOfPerform, location, serviceID } = req.body;
  try {
    const updateResults = await contractDetailModel.updateContractDetailWithService({
      contractDetailID,
      location,
      dateOfPerform,
      serviceID
    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failure' });
    }
  } catch (error) {
    res.json({ status: 'error' });
    console.error('Update Contract Detail With Service Failed', error);
  }
}

// Xoá HĐCT theo mã HĐ tạm thời 
const removeContractDetailByContractIDTemporary = async (req, res) => {
  try {
    const contractIDTemporary = req.params.contractIDTemporary;
    // xoá phát sinh khi không lưu hợp đồng
    const deleteIncurrentResult = await contracModel.deletePhatSinhByContractIDTemporary(contractIDTemporary);

    // Xoá hợp đồng chi tiết có mã HĐ tạm thời
    const results = await contractDetailModel.removeContractDetailByContractIDTemporary(contractIDTemporary);

    // TODO: nếu là sẩn phẩm thì sẽ cập nhật lại ss
    // TODO: Xoá công việc
    // TODO: Xoá phát sinh

    if (results.affectedRows > 0 && deleteIncurrentResult > 0) {
      res.json({ status: 'success' });
      console.log('Success');
    } else {
      res.json({ status: 'failure' });
      console.log('failed');

    }
  } catch (error) {
    console.error('Delete Contract Detail Failed', error);
  }
}

// Xoá HĐCT theo mã HĐCT
const removeContractDetailByContractDetailID = async (req, res) => {
  try {
    const contractDetailID = req.params.contractDetailID;
    const productID = req.body.productID;
    
    // Xoá công việc theo mã HĐCT
    await contractDetailModel.deleteTaskByContractDetailID(contractDetailID);

    // Cập nhật sản phẩm thành trạng thái "Sẵn sàng"
    await contractDetailModel.updateStatusReadyIntoProductByProductID(productID);

    // Xoá phát sinh hợp đồng
    await contracModel.deletePhatSinhByIdHDCT(contractDetailID);

    // Xoá HĐCT
    const results = await contractDetailModel.removeContractDetailByContractDetailID(contractDetailID);

    if (results.affectedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failure' });
    }
  } catch (error) {
    console.error('Delete Contract Detail Failed', error);
  }
}

// Lấy tất cả danh sách dịch vụ
const getServices = async (req, res) => {
  try {
    const services = await contractDetailModel.getServices();
    res.json(services);
  } catch (error) {
    console.error('Get Contract Details Failed', error);
  }
}

// Lấy danh sách sản phẩm ở trạng thái sẵn sàng
const getProductsByStatusReady = async (req, res) => {
  try {
    const products = await contractDetailModel.getProductsByStatusReady();
    res.json(products);
  } catch (error) {
    console.error('Get Contract Details Failed', error);
  }
}

module.exports = {
  getContractDetails,
  getContractDetailsByContractID,
  getContractDetailsByContractIDTemporary,
  insertContractDetailWithProduct,
  insertContractDetailWithService,
  updateContractDetailContractID,
  updateContractDetailWithProduct,
  updateContractDetailWithService,
  removeContractDetailByContractIDTemporary,
  removeContractDetailByContractDetailID,
  getServices,
  getProductsByStatusReady
}