import { useState, useEffect } from "react";
import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

function useAuth() {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null,
  );

  async function handleRegister(username, password) {
    try {
      await authAxios.post(`/register`, { username, password });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function handleLogin(username, password) {
    try {
      const response = await authAxios.post(`/login`, { username, password });
      const { accessToken, refreshToken } = response.data;

      setToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function refresh() {
    try {
      const response = await axios.post("/refresh-token", { refreshToken });
      const { newAccessToken } = response.data;

      setToken(newAccessToken);
      return newAccessToken;
    } catch (err) {
      console.error(`Refresh failed: ${err}`);
      throw err;
    }
  }

  async function handleLogout() {
    try {
      await axios.post("/logout", { refreshToken });
    } catch (err) {
      console.error(`Logout error: ${err}`);
      throw err;
    }
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("refreshToken");
  }

  useEffect(() => {
    const requestInterceptor = authAxios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );

    const responseInterceptor = authAxios.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalRequest = err.config;

        if (
          err.response?.status === 401 &&
          !originalRequest._retry &&
          refreshToken
        ) {
          originalRequest._retry = true;

          try {
            const newToken = await refresh();

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return authAxios(originalRequest);
          } catch (refreshErr) {
            return Promise.reject(refreshErr);
          }
        }
        return Promise.reject(err);
      },
    );
    return () => {
      authAxios.interceptors.request.eject(requestInterceptor);
      authAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refreshToken]);

  return {
    token,
    isAuthenticated: !!token,
    handleRegister,
    handleLogin,
    handleLogout,
    authAxios,
  };
}

export default useAuth;
