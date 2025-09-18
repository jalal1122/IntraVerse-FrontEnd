import axios from "axios";

const localLink = "http://localhost:5000";
const productionLink = import.meta.env.VITE_APP_API_URL;

// Set up default configuration for axios
axios.defaults.baseURL =
  import.meta.env.VITE_APP_NODE_ENV === "production"
    ? productionLink
    : localLink;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    error.timeout = 10000; // 10 seconds timeout

    // If the error is due to an expired token, attempt to refresh it
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      originalRequest.withCredentials = true;
      try {
        const response = await axios.get("/api/user/refresh-token");
        if (response.status === 200) {
          console.log("Token refreshed successfully");
        } else {
          document.cookie =
            "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return axios(originalRequest);
      } catch (err) {
        document.cookie =
          "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
