import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.APP_DOMAIN_FRONTEND,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
