import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
// import { useAuth } from "../../Context/AuthProvider";
// import Loggin from "./Google_Login";
// import Loggout from "./Google_Logout";
import { useAuth } from "../Context/AuthProvider";
import { Navigate, useNavigate, Link } from "react-router-dom";
// import { gapi } from "gapi-script";
import axios from "axios"
import LoadingComponent from "../../utils/LoadingComponent";

const clientID = "1084392458345-pehhma6j6823s6gdkpt4hr5p5fth1vjf.apps.googleusercontent.com"
const Login = () => {
  const { isAuthenticated, login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setButtonLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        login(response.data.existingUser, response.data.token)
        setLoading(false)
        navigate('/home', { state: { email: email } });
        setErr('')
        // You can also perform additional actions on success if needed
      } else {
        setErr('Unexpected error occurred.');
      }
    } catch (error) {
      setErr(error.message)

      if (error.response) {
        setErr(error.response.data.message || 'An error occurred.');
      } else if (error.request) {
        // The request was made but no response was received
        setErr('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErr('Error setting up the request.');
      }
    } finally {
      setLoading(false)
      setButtonLoading(false)
    }
  };

  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: clientID,
  //       scope: ""
  //     })
  //   }
  //   gapi.load('client:auth2', start)
  // }, [])

  useEffect(() => {
    setErr('')
  }, [email, password])

  let formValid = email && password

  if (loading) {
    <LoadingComponent />
  }

  return (
    <div className="relative">
      <div>
        <img src="https://images.pexels.com/photos/5903095/pexels-photo-5903095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='food-icon' className="login-food-image" />
      </div>
      <div className="absolute top-24 left-0 right-0 bg-[#ee8549b3] w-96 mx-auto my-6 ">
        <h1 className="font-bold text-3xl pt-16 mb-3 text-white text-center uppercase">
          User Login
        </h1>
        <div className="w-64 mx-auto ">
          <form className="" onSubmit={handleSubmit}>
            <div className="relative flex">
              <MdAccountCircle className="text-6xl text-emerald-900 outline-black absolute box-border z-20 -ml-3" />
              <input
                type="email"
                placeholder="Enter email"
                required
                className="my-3 w-full h-8 box-border hover:border-none pl-14 p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <MdLockReset className="text-6xl text-emerald-900 absolute z-20 -ml-3" />
              <input
                type="password"
                placeholder="Password"
                required
                className="my-3 h-8 w-full hover:border-none pl-14 p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type='submit' className={`uppercase rounded-3xl w-full p-2 my-5 font-bold bg-white text-gray-700 hover:bg-emerald-100 ${buttonLoading || err ? "opacity-50 cursor-not-allowed" : "" // Disable the button styles when loading
              }`}
              disabled={(buttonLoading || err) && formValid}

            >
              {buttonLoading ? "Loading..." : "Login"}
            </button>
            {err ? <div className="p-1  rounded-md flex justify-center bg-red-600 text-white mb-4">{err}</div> : ''}
          </form>
          <div>
            <p className="text-white">Do not have an Account? <Link to='/signup' className="hover:text-white">SignUp Now!!</Link></p>
          </div>
          {/* <div className="my-2">
         <Loggin user={user} setUser={setUser} />
       </div>
       <div className="my-2">
         <Loggout />
       </div> */}
        </div>
      </div>
    </div>

  );

};

export default Login;   
