const { json } = require('body-parser');
const arrayHelpers = require('../helpers/array-helpers.js');
const serviceModel = require('../models/service.model.js');

// Lấy danh sách dịch vụ
const getServices = async (req, res) => {
  try {
    const services = await serviceModel.getServices();
    const servicesReversed = arrayHelpers.reverseArray(services);
    res.json(servicesReversed);
  } catch (error) {
    res.json('error');
    console.error('Get services failed', error);
  }
}

// Thêm mới dịch vụ
const insertService = async (req, res) => {
  const { serviceName, servicePrice } = req.body;
  try {
    const services = await serviceModel.getServices();
    const isServiceNameExists = services.some((service) => service.tenDichVu === serviceName);

    if (isServiceNameExists) {
      res.json({ status: 'exists' });
    } else {
      await serviceModel.insertService({
        serviceName,
        servicePrice
      });
      res.json({ status: 'success' });
    }
  } catch (error) {
    res.json({ status: 'error' });
    console.error('Insert service failed', error);
  }
}

// Cập nhật dịch vụ
const updateService = async (req, res) => {
  const serviceID = req.params.serviceID;
  const { serviceName, servicePrice } = req.body;
  try {
    const results = await serviceModel.updateService({
      serviceName,
      servicePrice,
      serviceID
    });

    if (results.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failure' });
    }
  } catch (error) {
    res.json({ status: 'error' });
    console.error('Insert service failed', error);
  }
}

// Xoá dịch vụ => ẩn hiển thị dịch vụ
const removeService = async (req, res) => {
  const serviceID = req.params.serviceID;
  try {
    const results = await serviceModel.removeService(serviceID);

    if (results.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failure' });
    }
  } catch (error) {
    res.json({ status: 'error' });
    console.error('Insert service failed', error);
  }
}

module.exports = {
  getServices,
  insertService,
  updateService,
  removeService
}