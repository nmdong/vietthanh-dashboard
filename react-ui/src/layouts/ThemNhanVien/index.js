import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Checkbox, FormControlLabel,
    MenuItem, Select, FormControl
} from '@mui/material';
import { toast } from 'react-toastify';

import SuiBox from "components/SuiBox";
import SuiButton from "components/SuiButton";
import PropTypes from 'prop-types';
import NhanVienApi from 'api/nhanvien';
import { useAuth } from "../../auth-context/auth.context";

import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";

const FormNhanVien = ({ open, onClose }) => {
    let { user } = useAuth();
    const defaultFormData = {
        Manhanvien: '',
        Tennhanvien: '',
        Sodienthoai: '',
        NgayvaoLam: '',
        LoaiID: '',
        USERID: '',
        PASSWORD: '',
        Makhquanh: '',
        Hinhanh: '',
        Danghiviec: false
    };
    const [formData, setFormData] = useState(defaultFormData);

    const [viTriOptions, setViTriOptions] = useState([]);

    useEffect(() => {
        const fetchViTri = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/vitri');
                setViTriOptions(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách vị trí:', error);
            }
        };
        fetchViTri();
        console.log("Vi tri options:", viTriOptions);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        console.log("Input name:", name, "value:", value, "type:", type, "checked:", checked);
        console.log("Form data before update:", formData);
        if (name === 'NgayvaoLam') {
            // value từ input datetime-local thường có dạng "2025-05-06T15:30"
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                // Kết quả chuẩn ISO 8601: 2025-05-06T08:30:00.000Z
                setFormData({
                    ...formData,
                    NgayvaoLam: date.toISOString() // giữ nguyên format chuẩn
                });
            } else {
                console.error("Ngày vào làm không hợp lệ:", value);
            }
            return;
        }

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        console.log("Form data updated:", formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await NhanVienApi.taoMoiNhanVien({ formData, token: user.token });
            if (response.data && response.data.success === false) {
                console.error(response.data.msg);
                toast.error(response.data.msg);
                return;
            }
            toast.success("Thêm nhân viên thành công!");
        } catch (err) {
            console.log(err);
            if (err.response) {
                console.error(err.response.data.msg);
            }
            toast.error(err.response.data.msg);
        }
        setFormData(defaultFormData); // 🔁 reset form về mặc định
        onClose(); // đóng dialog sau khi submit
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Thêm Nhân Viên Mới</DialogTitle>
            <DialogContent dividers>
                <form onSubmit={handleSubmit} id="form-nhan-vien">
                    <SuiBox mb={2}>
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography component="label" variant="caption" fontWeight="bold">
                                Mã nhân viên
                            </SuiTypography>
                        </SuiBox>
                        <SuiInput
                            // defaultValue={"Nguyen Van A"}
                            name="Manhanvien"
                            onChange={handleChange}
                            placeholder="Mã nhân viên"
                            required
                        />
                    </SuiBox>
                    <SuiBox mb={2}>
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography component="label" variant="caption" fontWeight="bold">
                                Tên nhân viên
                            </SuiTypography>
                        </SuiBox>
                        <SuiInput
                            name="Tennhanvien"
                            onChange={handleChange}
                            placeholder="Tên nhân viên"
                            required
                        />
                    </SuiBox>
                    <SuiBox mb={2}>
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography component="label" variant="caption" fontWeight="bold">
                                Số điện thoại
                            </SuiTypography>
                        </SuiBox>
                        <SuiInput
                            name="Sodienthoai"
                            onChange={handleChange}
                            type="tel"
                            placeholder="Số điện thoại"
                            required
                        />
                    </SuiBox>
                    <SuiBox mb={2}>
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography component="label" variant="caption" fontWeight="bold">
                                Ngày vào làm
                            </SuiTypography>
                        </SuiBox>
                        <SuiInput
                            name="NgayvaoLam"
                            onChange={handleChange}
                            type="date"
                            placeholder="Ngày vào làm"
                            InputLabelProps={{ shrink: true }}
                        />
                    </SuiBox>
                    <SuiBox mb={2}>
                        <FormControl fullWidth margin="dense">
                            {/* <InputLabel id="loai-id-label">Loại vị trí</InputLabel> */}
                            <Select
                                labelId="loai-id-label"
                                name="LoaiID"
                                value={formData.LoaiID}
                                onChange={handleChange}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>-- Chọn Vị Trí Nhân Viên --</em>
                                </MenuItem>
                                {viTriOptions.map((item) => (
                                    <MenuItem key={item.LoaiID} value={item.LoaiID}>
                                        {item.Loaiten}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </SuiBox>
                    <FormControlLabel
                        control={<Checkbox name="Danghiviec" onChange={handleChange} />}
                        label="Đang nghỉ việc"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button type="submit" form="form-nhan-vien" variant="contained">Lưu</Button>
            </DialogActions>
        </Dialog>
    );
};

const ThemNhanVien = () => {
    const [moDialog, setMoDialog] = useState(false);

    return (
        <>
            <SuiBox mt={2}>
                <SuiButton
                    component="a"
                    // href="http://localhost:3000/api/v1/user/them-nhan-vien"
                    target="_blank"
                    rel="noreferrer"
                    variant="gradient"
                    buttonColor="info"
                    fullWidth
                    onClick={() => setMoDialog(true)}
                >
                    Thêm Nhân Viên
                </SuiButton>
            </SuiBox>
            <FormNhanVien open={moDialog} onClose={() => setMoDialog(false)} />
        </>
    );
};

FormNhanVien.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default ThemNhanVien;
