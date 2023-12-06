import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, token: "" })
    const [theme, setTheme] = useState("light")
    const login = (token) => {
        setAuth({ ...auth, isAuthenticated: true, token: token })
    }
    const logout = () => {
        setAuth({ ...auth, isAuthenticated: false, token: "" })
    }
    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <AuthContext.Provider value={{ login, logout, ...auth, toggleTheme, theme }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)
}

export { useAuth }
export default AuthProvider