import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";

export const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  // Attach request interceptor
  axiosSecure.interceptors.request.use(
    async (config) => {
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Attach response interceptor
  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        await logout();
        Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "Session expired. Please login again.",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};
