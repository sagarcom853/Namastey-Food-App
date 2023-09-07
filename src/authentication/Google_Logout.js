import React from "react";
import { GoogleLogout } from "react-google-login";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const clientId = "1084392458345-pehhma6j6823s6gdkpt4hr5p5fth1vjf.apps.googleusercontent.com";

function Logout() {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const onSuccess = () => {
        console.log("Logout SUCCESS!");
        logout()
        navigate('/')
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                className="w-60 mb-4"
            />
        </div>
    );
}

export default Logout;
