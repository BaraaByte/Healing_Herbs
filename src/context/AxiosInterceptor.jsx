import { useEffect, useContext } from "react";
import api from "../components/utils/axiosInstance";
import { userContext } from "./UserContext";

export default function AxiosInterceptor({ children }) {
  const { logout } = useContext(userContext);

  useEffect(() => {
    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          localStorage.getItem("refresh_token")
        ) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refresh_token");
            const { data } = await api.post("/api/v1/auth/refresh", { refresh: refreshToken });

            localStorage.setItem("accessToken", data.access);
            api.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
            originalRequest.headers["Authorization"] = `Bearer ${data.access_token}`;

            return api(originalRequest);
          } catch (err) {
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(resInterceptor);
    };
  }, [logout]);

  return children;
}
