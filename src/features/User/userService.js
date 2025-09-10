import axios from "../../utils/axios.js";

const API_URL = "/api/user"; // Use absolute path since base URL is set

// Register user
const RegisterUser = async (userData) => {
  // Create FormData for file upload
  const formData = new FormData();
  formData.append("username", userData.username);
  formData.append("email", userData.email);
  formData.append("password", userData.password);

  // Only append profile picture if it exists
  if (userData.profilePicture) {
    formData.append("profilePicture", userData.profilePicture);
  }

  const response = await axios.post(`${API_URL}/register`, formData, {
    headers: {
      // Don't set Content-Type, let browser set it with proper boundary for FormData
    },
  });

  return response.data;
};

// Login User
const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    // localStorage.setItem("user", JSON.stringify(response.data.data));
    document.cookie.set("user", JSON.stringify(response.data.data), {
      expires: new Date(Date.now() + 86400000), // 1 day
      path: "/",
    });
  }

  return response.data;
};

// Logout User
const logoutUser = async () => {
  const response = await axios.get(`${API_URL}/logout`);

  if (response.data) {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  return response.data;
};

export const userService = {
  RegisterUser,
  loginUser,
  logoutUser,
};
