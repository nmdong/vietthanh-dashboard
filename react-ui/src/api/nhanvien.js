import axios from "./index";

class NhanVienApi {
    static taoMoiNhanVien = (data) => {
        return axios.post(`${base}/nhan-vien`, data);
    };
}

let base = "users";

export default NhanVienApi;
