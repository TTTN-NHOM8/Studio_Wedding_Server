const contractModel = require('../models/contract-model');

// Lấy tất cả danh sách HD
const getContracts = async (req, res) => {
  try {
    const contract = await contractModel.getContracts();
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}

// Lấy tất cả  ds phát sinh
const getAllIncurrent= async(req, res) => {
  const idHopDongTamThoi = req.params.idHopDong;

  try {
    const results = await contractModel.getAllIncurrent(idHopDongTamThoi);
    res.json(results);
  } catch (error) {
    console.error('Error', error);
  }
}

// Lấy HD by IDHD
const getContractById = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  try {
    const contract = await contractModel.getContractById(idHopDong);
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}

// Lấy phát sinh theo idHD
const getIncurrentByIdHD = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  try {
    const incurrent = await contractModel.getIncurrentByIdHD(idHopDong);
    const Incurrent=incurrent[0];
    res.send(Incurrent);
  } catch (error) {
    console.error('Error', error);
  }
}

// Thêm mới HD
const insertContract = async (req, res) => {
  const { idHopDong, ngayThanhToan, tienCoc, giamGia, tongTien, trangThaiThanhToan, idKhachHang } = req.body;
  const trangThaiHopDong = 'Đang thực hiện';
  try {
    await contractModel.insertContract({
      idHopDong,
      ngayThanhToan,
      tienCoc,
      giamGia,
      tongTien,
      trangThaiThanhToan,
      trangThaiHopDong,
      idKhachHang
    });
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Erorr', error);
  }
}
// Thêm phát sinh
const insertIncurrent = async (req, res) => {
  const { phiPhatSinh, hanTra, noiDung, idHopDong } = req.body;
  const hienThi = 1;
  try {
    await contractModel.insertIncurrent({
      phiPhatSinh,
      hanTra,
      noiDung,
      hienThi,
      idHopDong
    });
    await contractModel.updateProductStatus(idHopDong)
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Erorr', error);
  }
}

// Cập nhật hợp đồng
const updateContract = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  const { ngayThanhToan, giamGia, tongTien, trangThaiThanhToan, trangThaiPhatSinh } = req.body;
  try {
    const updateResults = await contractModel.updateContract({
      ngayThanhToan,
      giamGia,
      tongTien,
      trangThaiThanhToan,
      trangThaiPhatSinh,
      idHopDong
    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    console.error('Errorr', error);
  }
}
// Cập nhật phát sinh
const updateInCurrent = async (req, res) => {
  const idPhatSinh = req.params.idPhatSinh;
  const { noiDung, hanTra, phiPhatSinh, idSanPham,idHopDong } = req.body;
  
  try {
      const updateResults = await contractModel.updateIncurrent({
          noiDung,
          hanTra,
          phiPhatSinh,
          idPhatSinh
      });

      await contractModel.updateProductStatusByID(idSanPham)
      await contractModel.updateStatusIsOncurrentHopDong();

      if (updateResults.changedRows > 0) {
          res.json({ status: 'success' });
          console.log('Success', noiDung, hanTra, phiPhatSinh, idPhatSinh, idSanPham);
      } else {
          res.json({ status: 'failed' });
          console.log('Failed', noiDung, hanTra, phiPhatSinh, idPhatSinh, idSanPham);
      }
  } catch (error) {
      console.error('Error', error);
      res.status(500).json({ status: 'error', error: error.message });
  }
}
// [Xoá] cập nhật lại toàn bộ các trường bằng trong phát sinh = null 
const updateIncurrentNone= async(req,res) => {
  const idPhatSinh = req.params.idPhatSinh;
  const { noiDung, hanTra, phiPhatSinh, idSanPham,idHopDong } = req.body;
  
  try {
      const updateResults = await contractModel.updateIncurrent({
          noiDung,
          hanTra,
          phiPhatSinh,
          idPhatSinh
      });
      await contractModel.updateProductStatusNoneByID(idSanPham);
      await contractModel.updateStatusIsNotOncurrentHopDong();

      if (updateResults.changedRows > 0) {
          res.json({ status: 'success' });
          console.log('Success',idPhatSinh, idSanPham);
      } else {
          res.json({ status: 'failed' });
          console.log('Failed',idPhatSinh, idSanPham);
      }
  } catch (error) {
      console.error('Error', error);
      res.status(500).json({ status: 'error', error: error.message });
  }  
  
}
// Xoá hợp đồng
const deleteContract = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  const hienThi = 0;
  try {
    const updateResults = await contractModel.deleteContract({
      hienThi,
      idHopDong

    });

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    console.error('Errorr', error);
  }
}

//   Xoá phát sinh
const deleteIncurrent = async (req, res) => {
  const idHopDong = req.params.idHopDong;
  try {
    const updateResults = await contractModel.deleteIncurrent(idHopDong);
    await contractModel.updateProductStatusNoneIncurrent(idHopDong)
    await contractModel.updateIncurrentStatusNone(idHopDong)

    if (updateResults.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    console.error('Errorr', error);
  }
}
// lấy tất cả danh sách khách hàng
const getAllClients = async (req, res) => {
  try {
    const contract = await contractModel.getClients();
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}
// lấy tất cả danh sách khách hàng
const getDetailContractByIdHDTT = async (req, res) => {
  const idHDTamThoi = req.params.idHDTamThoi;
  try {
    const contract = await contractModel.getDetailContractByIdHDTT(idHDTamThoi);
    res.json(contract);
  } catch (error) {
    console.error('Error', error);
  }
}

// xoá công việc
const deleteTaskByidHDTamThoi = async (req, res) => {
  const idHDTamThoi = req.params.idHDTamThoi;
  try {
    const results = await contractModel.deleteTaskByidHDTamThoi(idHDTamThoi);
    if (results.changedRows > 0) {
      res.json({ status: 'success' });
    } else {
      res.json({ status: 'failed' });
    }
  } catch (error) {
    console.error('Error', error);

  }
}


module.exports = {
  getContracts,
  getContractById,
  getIncurrentByIdHD,
  insertContract,
  insertIncurrent,
  updateContract,
  deleteContract,
  deleteIncurrent,
  getAllClients,
  getDetailContractByIdHDTT,
  deleteTaskByidHDTamThoi,
  getAllIncurrent,
  updateInCurrent,
  updateIncurrentNone
  
}