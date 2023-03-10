import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000",
});

export default client;
