import axios from "../../utils/axios.js";

// Get trending posts from the backend
const getTrendingPosts = async () => {
  const response = await axios.get("/api/posts/trending");
  return response.data;
};

const postsService = {
  getTrendingPosts,
};

export default postsService;
