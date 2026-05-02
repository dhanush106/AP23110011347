import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
});

export default apiClient;