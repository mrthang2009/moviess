import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://phimapi.com",
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
