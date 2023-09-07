import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import jwtDecode from "jwt-decode";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";


const clientID = "1084392458345-pehhma6j6823s6gdkpt4hr5p5fth1vjf.apps.googleusercontent.com"

function Loggin({ setUser }) {
    const navigate = useNavigate()
    const { login } = useAuth()
    const onSuccess = (res) => {
        var decoded = jwtDecode(res.credential)
        console.log("decode", decoded)
        console.log("LOGIN SUCESS! Current USer : ", res)
        setUser(decoded)
        login()
        navigate('/', { state: { name: decoded.name } })
    }
    const onFailure = (res) => {
        console.log("LOGIN FAILED!", res)
    }
    return (
        <div id="signInButton">
            <GoogleOAuthProvider clientId="1084392458345-pehhma6j6823s6gdkpt4hr5p5fth1vjf.apps.googleusercontent.com">
                <GoogleLogin
                    clientID={clientID}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isAssignedIn={true}
                    isSignedIn={true}
                    className="w-84 py-2 my-2"
                >
                </GoogleLogin>
            </GoogleOAuthProvider>

        </div>
    )
}
export default Loggin