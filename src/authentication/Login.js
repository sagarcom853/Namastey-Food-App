import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { useAuth } from "../Context/AuthProvider";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Loggin from "./Google_Login";
import Loggout from "./Google_Logout";
import { gapi } from "gapi-script";
import axios from "axios"

const clientID = "1084392458345-pehhma6j6823s6gdkpt4hr5p5fth1vjf.apps.googleusercontent.com"
const Login = () => {
  const { isAuthenticated, login } = useAuth()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const handleSubmit = () => {
    login()
    navigate('/', { state: { name: name } })
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  return (
    <div className="diagonal-split-background w-96 mx-auto my-8">
      <h1 className="font-bold text-3xl pt-16 mb-3 text-white text-center uppercase">
        User Login
      </h1>
      <div className="w-64 mx-auto relative">
        <form className="" onSubmit={handleSubmit}>
          <div className="relative flex">
            <MdAccountCircle className="text-6xl text-emerald-900 outline-black absolute box-border z-20 -ml-3" />
            <input
              type="text"
              placeholder="Username"
              required
              className="my-3 w-full h-8 box-border hover:border-none pl-14 p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <button className="uppercase rounded-3xl w-full p-2 my-5 font-bold bg-white text-gray-700 hover:bg-emerald-100">
            Login
          </button>
        </form>
        <div>
          <p className="text-gray-400">Do not have an Account? <Link to='/signup' className="hover:text-white">SignUp Now!!</Link></p>
        </div>
        <div className="my-2">
          <Loggin user={user} setUser={setUser} />
        </div>
        <div className="my-2">
          <Loggout />
        </div>
      </div>
    </div>
  );
};

export default Login;   
