import axios from "axios";

const localLink = "http://localhost:5000";
const productionLink = import.meta.env.VITE_APP_API_URL;

// Set up default configuration for axios
axios.defaults.baseURL =
  import.meta.env.VITE_APP_NODE_ENV === "production"
    ? productionLink
    : localLink;
axios.defaults.withCredentials = true;

export default axios;
