import axios from "axios";

const Api = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

Api.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export default Api;
