import axios from "../../utils/axios.js";

const getAdminPosts = async () => {
  const response = await axios.get("/api/admin/posts");
  return response.data;
};

const createPost = async (postData) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("category", postData.category);
  if (postData.image) {
    formData.append("image", postData.image);
  }

  const response = await axios.post("/api/post", formData);
  return response.data;
};

const getEditPost = async (id) => {
  const response = await axios.get(`/api/admin/post/${id}`);
  return response.data;
};

const updatePost = async (postData) => {
  const { title, content, category, image } = postData;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("category", category);
  formData.append("image", image);

  const response = await axios.put(`/api/post/${postData.id}`, formData);
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios.delete(`/api/post/${id}`);
  return response.data;
}

const refreshTrendingPosts = async () => {
  const response = await axios.post("/api/posts/refresh-trending");
  return response.data;
};

const adminService = {
  getAdminPosts,
  createPost,
  deletePost,
  refreshTrendingPosts,
  updatePost,
  getEditPost,
};

export default adminService;
