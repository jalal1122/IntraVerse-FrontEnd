import axios from "../../utils/axios.js";

const getAdminPosts = async () => {
  const response = await axios.get("/api/admin/posts");
  return response.data;
};

const adminService = {
  getAdminPosts,
};

export default adminService;
