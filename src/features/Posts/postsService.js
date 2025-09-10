import axios from "../../utils/axios.js";

// Get trending posts from the backend
const getTrendingPosts = async () => {
  const response = await axios.get("/api/posts/trending");
  return response.data;
};

// Get All posts from the backend
const getAllPosts = async () => {
  const response = await axios.get("/api/posts");
  return response.data;
};

const getPostById = async (id) => {
  const response = await axios.get(`/api/post/${id}`);
  return response.data;
};

const getPostComments = async (postId) => {
  const response = await axios.get(`/api/comments/${postId}`);
  return response.data;
}

const postsService = {
  getTrendingPosts,
  getAllPosts,
  getPostById,
  getPostComments
};

export default postsService;
