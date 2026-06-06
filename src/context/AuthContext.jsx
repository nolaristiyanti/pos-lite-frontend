import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/me");

      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  };

  const login = async (tokenValue) => {
    localStorage.setItem("token", tokenValue);

    setToken(tokenValue);

    await fetchUser();
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/logout");
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("token");

      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        await fetchUser();
      }

      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};