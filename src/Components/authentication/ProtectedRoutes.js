import { isAsyncThunkAction } from "@reduxjs/toolkit";
import { useAuth } from "../Context/AuthProvider";
import { Route, Outlet, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    console.log('location in auth',location)
    if (isAuthenticated) {
        return <Outlet />
    } else {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
};
export default ProtectedRoute;



