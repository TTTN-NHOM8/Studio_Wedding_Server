const contractDetailModel = require('../models/contract-detail.model.js');

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

// Thêm mới HĐCT với gói sản phẩm 
const insertContractDetailWithProduct = async (req, res) => {
  const { contractDetailID, dateOfHire, dateOfReturn, productID } = req.body;
  try {
    await contractDetailModel.insertContractDetailWithProduct({
      contractDetailID,
      dateOfHire,
      dateOfReturn,
      productID
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Insert Contract Detail With Product Failed', error);
  }
}

// Thêm mới HĐCT với gói dịch vụ 
const insertContractDetailWithService = async (req, res) => {
  const { contractDetailID, location, dateOfPerform, serviceID } = req.body;
  try {
    await contractDetailModel.insertContractDetailWithService({
      contractDetailID,
      location,
      dateOfPerform,
      serviceID
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Insert Contract Detail With Service Failed', error);
  }
}

// Cập nhật mã hợp đồng cho HĐCT
const updateContractDetailContractID = async (req, res) => {
  const contractDetailID = req.params.contractDetailID;
  const contractID = req.body.contractID;
  try {
    const updateResults = await contractDetailModel.updateContractDetailContractID({
      contractID,
      contractDetailID
    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failure' });
    }
  } catch (error) {
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
      res.json({ status: 'success', rs: updateResults });
    } else {
      res.json({ status: 'failure', rs: updateResults });
    }
  } catch (error) {
    console.error('Update Contract Detail With Service Failed', error);
  }
}

// Xoá HĐCT theo mã HĐCT
const removeContractDetail = async (req, res) => {
  try {
    const contractDetailID = req.params.contractDetailID;
    const results = await contractDetailModel.removeContractDetail(contractDetailID);

    if (results.affectedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failure' });
    }
  } catch (error) {
    console.error('Delete Contract Detail Failed', error);
  }
}

module.exports = {
  getContractDetails,
  getContractDetailsByContractID,
  insertContractDetailWithProduct,
  insertContractDetailWithService,
  updateContractDetailContractID,
  updateContractDetailWithProduct,
  updateContractDetailWithService,
  removeContractDetail
}