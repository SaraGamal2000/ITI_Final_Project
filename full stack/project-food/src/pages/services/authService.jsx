import axios from "axios";

const API_URL = "http://localhost:9000/api/";

// Register user
const register = (first_name, last_name, email, password) => {
  return axios.post(API_URL + "register/", {
    first_name,
    last_name,
    email,
    password,
  });
};

// Get current user info
const getCurrentUser = (token) => {
  return axios.get(API_URL + "userinfo/", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update user info
const updateUser = (data, token) => {
  return axios.put(API_URL + "userinfo/update/", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Forgot password
const forgotPassword = (email) => {
  return axios.post(API_URL + "forgot_password/", { email });
};

// Reset password
const resetPassword = (token, password, confirmPassword) => {
  return axios.post(`${API_URL}reset_password/${token}`, {
    password,
    confirmPassword,
  });
};

// export default { register, getCurrentUser, updateUser, forgotPassword, resetPassword };
const authService = {
  register,
  getCurrentUser,
  updateUser,
  forgotPassword,
  resetPassword,
};
export default authService;
