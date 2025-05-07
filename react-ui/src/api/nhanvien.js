import axios from "./index";

class NhanVienApi {
    static taoMoiNhanVien = (data) => {
        return axios.post(`${base}/nhan-vien`, data, { headers: { Authorization: `${data.token}` } });
    };
}

let base = "users";

export default NhanVienApi;
