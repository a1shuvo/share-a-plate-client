import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "./useAuth";

export const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          // Token expired or unauthorized
          await logout();
          Swal.fire({
            icon: "warning",
            title: "Session expired",
            text: "Please login again",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logout, navigate, axiosSecure]);

  return axiosSecure;
};
