import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const initialAuthState = {
    isAuthenticated: false,
    token: "",
    user: {},
  };
  // Retrieve user info from localStorage or set to initial state
  let userInfo = JSON.parse(localStorage.getItem("auth")) || {};
  const [auth, setAuth] = useState(userInfo || initialAuthState);
  const [theme, setTheme] = useState("light");
  const login = (user, token = "") => {
    let authObject = {
      ...auth,
      isAuthenticated: true,
      token: token,
      user: user,
    };
    localStorage.setItem("auth", JSON.stringify(authObject));
    setAuth(authObject);
  };
  const logout = () => {
    let authObject = { ...auth, isAuthenticated: false, token: "", user: {} };
    localStorage.setItem("auth", JSON.stringify(authObject));
    setAuth(authObject);
  };
  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const setAuthStorage = (userObject)=>{
    localStorage.setItem("auth", JSON.stringify(userObject));
    setAuth(userObject);
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, ...auth, setAuth, toggleTheme, theme, setAuthStorage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth };
export default AuthProvider;
