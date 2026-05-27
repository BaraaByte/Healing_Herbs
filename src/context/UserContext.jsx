// src/context/UserContext.js
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export default function UserContextProvider({ children }) {
  const [userTokenAccess, setUserTokenAccess] = useState(null);
  const [userTokenRefresh, setUserTokenRefresh] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    if (access) setUserTokenAccess(access);
    if (refresh) setUserTokenRefresh(refresh);
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setUserTokenAccess(access);
    setUserTokenRefresh(refresh);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUserTokenAccess(null);
    setUserTokenRefresh(null);

    // window.location.href = "/#/login";
  };

  return (
    <userContext.Provider
      value={{
        userTokenAccess,
        userTokenRefresh,
        setUserTokenAccess,
        setUserTokenRefresh,
        login,
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
