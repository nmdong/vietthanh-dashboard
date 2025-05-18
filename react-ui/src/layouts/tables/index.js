/**
=========================================================
* Viet Thanh Plastic - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// @mui material components
import Card from "@mui/material/Card";

// Viet Thanh Plastic components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Viet Thanh Plastic example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Table";

// Custom styles for the Tables
import styles from "layouts/tables/styles";

import Grid from "@mui/material/Grid";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

import { FormControl, MenuItem, Select } from "@mui/material";

const loaiDoiTac = [
  { id: "01", value: "DL", label: "Đại lý" },
  { id: "02", value: "NPP", label: "Nhà phân phối" },
];

const FormNPPanDL = ({ open, onClose }) => {
  const [dataKhachHang, setFormData] = useState({
    Makhach: "", // Yeu Cau
    Tenkhach: "", // Yeu Cau
    loaiDoiTac: "", // Yeu Cau
    Sodienthoai: "", // Yeu Cau
    Ngaytao: getCurrentDateISOFormat(), // Yeu Cau
    LoaiID: "",
    User: "",
    Pass: "",
    Danghi: false,
    Hinhanh: "",
    Ngaysinhhat: "", // Yeu Cau
    Diachi: "", // Yeu Cau
    Nhanvien: "",
    Email: "",
    Sdtzalo: "",
    Nguoilienhe: "",
    Xaphuong: { tinh: "", huyen: "", xa: "" }, // Yeu Cau
    Ksd: "",
  });
  const maKhachHang = generateRandomString();

  useEffect(() => {
    console.log("📍FormData đã cập nhật:", dataKhachHang);
  }, [dataKhachHang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Tenkhach") {
      setFormData((prev) => ({
        ...prev,
        Makhach: `${maKhachHang}_${value}`.toUpperCase(),
      }));
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDiaChiChange = (Xaphuong) => {
    setFormData((prev) => ({
      ...prev,
      Xaphuong,
    }));
  };

  const handleSubmit = () => {
    const formatData = {
      "formData": {
        ...dataKhachHang
      }
    }
    console.log("📋 Dữ liệu đã nhập:", formatData);
    alert("Lưu thành công!");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm Đại Lý / Nhà Phân Phối</DialogTitle>
      <SuiBox mb={2}>
        <DialogContent>
          {/* Họ và tên */}
          <SuiBox mb={2}>
            <SuiInput
              name="Tenkhach"
              type="text"
              placeholder="Họ và tên"
              fullWidth
              margin="dense"
              value={dataKhachHang.Tenkhach}
              onChange={handleChange}
            />
          </SuiBox>

          {/* Địa chỉ */}
          <DiaChiSelect Xaphuong={dataKhachHang.Xaphuong} setDiaChi={handleDiaChiChange} />

          {/* Chức vụ và số điện thoại */}
          <SuiBox display="flex" justifyContent="flex-start" gap={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="dense">
                  <Select
                    labelId="loai-id-label"
                    name="loaiDoiTac"
                    value={dataKhachHang.loaiDoiTac}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>-- Loại Đối Tác --</em>
                    </MenuItem>
                    {loaiDoiTac.map((item) => (
                      <MenuItem key={item.id} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="dense"
                  name="Sodienthoai"
                  value={dataKhachHang.Sodienthoai}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                />
              </Grid>
            </Grid>
          </SuiBox>
        </DialogContent>
        <DialogActions>
          <SuiButton color="secondary" onClick={onClose}>
            Hủy
          </SuiButton>
          <SuiButton color="info" onClick={handleSubmit}>
            Lưu
          </SuiButton>
        </DialogActions>
      </SuiBox>
    </Dialog>
  );
};

const DiaChiSelect = ({ Xaphuong, setDiaChi }) => {
  const [huyenList, setHuyenList] = useState([]);
  const [xaList, setXaList] = useState([]);
  const [dsTinhTP, setDSTinhTP] = useState([]);

  useEffect(() => {
    const fetchDsTinhTP = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/tinh-tp');
        setDSTinhTP(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách Tỉnh:', error);
      }
    };
    fetchDsTinhTP();
  }, []);

  useEffect(() => {
    console.log("📍Địa chỉ đã cập nhật:", Xaphuong);
  }, [Xaphuong]);

  // Khi chọn Tỉnh -> reset huyện & xã, rồi gọi API huyện
  const handleTinhChange = async (e) => {
    const tinh = e.target.value;
    setDiaChi({ tinh, huyen: "", xa: "" });
    setHuyenList([]);
    setXaList([]);

    try {
      const response = await axios.get(`http://localhost:5000/api/users/huyen?matinh=${tinh}`);
      setHuyenList(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách Huyện:', error);
    }
  };

  // Khi chọn Huyện -> reset xã, rồi gọi API xã
  const handleHuyenChange = async (e) => {
    const huyen = e.target.value;
    setDiaChi({ ...Xaphuong, huyen, xa: "" });
    setXaList([]);

    try {
      const response = await axios.get(`http://localhost:5000/api/users/xa?mahuyen=${huyen}`);
      setXaList(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách Xã:', error);
    }
  };

  // Khi chọn Xã
  const handleXaChange = (e) => {
    const xa = e.target.value;
    setDiaChi({ ...Xaphuong, xa });
  };

  return (

    <SuiBox display="flex" justifyContent="flex-start" gap={2}>
      {/* Tỉnh */}
      <FormControl fullWidth margin="dense">
        <Select
          labelId="loai-id-label"
          value={Xaphuong.tinh}
          onChange={handleTinhChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>-- Chọn TP/Tỉnh --</em>
          </MenuItem>
          {dsTinhTP.map((item) => (
            <MenuItem key={item.Matinh} value={item.Matinh}>
              {item.Tentinh}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Huyện */}
      <FormControl fullWidth margin="dense" disabled={!huyenList.length}>
        <Select
          labelId="label-huyen"
          value={Xaphuong.huyen}
          onChange={handleHuyenChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>-- Quận/Huyện --</em>
          </MenuItem>
          {huyenList.map((item) => (
            <MenuItem key={item.Mahuyen} value={item.Mahuyen}>
              {item.Tenhuyen}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Xã */}
      <FormControl fullWidth margin="dense" disabled={!xaList.length}>
        <Select
          labelId="label-xa"
          value={Xaphuong.xa}
          onChange={handleXaChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>-- Xã/Phường --</em>
          </MenuItem>
          {xaList.map((item) => (
            <MenuItem key={item.Maxa} value={item.Maxa}>
              {item.Tenxa}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SuiBox>
  );
};

DiaChiSelect.propTypes = {
  Xaphuong: PropTypes.object.isRequired,
  setDiaChi: PropTypes.func.isRequired,
};


function Tables() {
  const classes = styles();
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [moDialog, setMoDialog] = useState(false);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SuiBox py={3}>
          <SuiBox mb={3}>
            <Card>
              <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiTypography variant="h6">Bảng dữ liệu về Đại Lý / Nhà Phân Phối</SuiTypography>
                <SuiButton
                  component="a"
                  // href="http://localhost:3000/api/v1/user/them-nhan-vien"
                  target="_blank"
                  rel="noreferrer"
                  variant="gradient"
                  buttonColor="info"
                  onClick={() => setMoDialog(true)}
                >
                  Thêm DL/NPP
                </SuiButton>
              </SuiBox>
              <SuiBox customClass={classes.tables_table}>
                <Table columns={columns} rows={rows} />
              </SuiBox>
            </Card>
          </SuiBox>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Bảng dữ liệu sản phẩm</SuiTypography>
            </SuiBox>
            <SuiBox customClass={classes.tables_table}>
              <Table columns={prCols} rows={prRows} />
            </SuiBox>
          </Card>
        </SuiBox>
        <Footer />
      </DashboardLayout>
      <FormNPPanDL open={moDialog} onClose={() => setMoDialog(false)} />
    </>
  );
}

export default Tables;

// ✅ Thêm định nghĩa prop types
FormNPPanDL.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

function generateRandomString() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `KH${result}`;
}

function getCurrentDateISOFormat() {
  const today = new Date();

  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0'); // Tháng từ 0
  const day = String(today.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00Z`;
}