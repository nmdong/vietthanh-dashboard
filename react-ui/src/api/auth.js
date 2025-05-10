import axios from "./index";

const base = "users";

const AuthApi = {
  Login: (data) => axios.post(`${base}/login`, data),
  Register: (data) => axios.post(`${base}/register`, data),
  Logout: (token) =>
    axios.post(`${base}/logout`, {}, {
      headers: { Authorization: `Bearer ${token.access}` },
    }),
};

export default AuthApi;
