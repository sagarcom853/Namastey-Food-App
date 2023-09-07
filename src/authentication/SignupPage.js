import React, { useEffect, useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { useAuth } from "../Context/AuthProvider";
import { Navigate, useNavigate, Link } from "react-router-dom";
import ProgressBar from "../Progressbar/ProgressBar";
// 
const Signup = () => {
  const { isAuthenticated, login } = useAuth()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confPass, setConfPass] = useState("")
  const [formData, setFormData] = useState({ name: "", password: "", confPass: "" })
  const [Err, setErr] = useState("")
  const [value, setvalue] = useState(0)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("formData",formData)
    if (Err === "") {
      login()
      navigate('/', { state: { name: name } })
    }
  }

  const handleBlur = () => {
    let progress = 0;
    Object.values(formData).forEach((value) => {
      console.log(value)
      console.log(Object.entries(formData).length)
      if (value !== '') {
        progress += Math.ceil(100 / Object.keys(formData).length);
        progress = Math.min(progress,100)
      }
    });
    setvalue(progress);
  }
  const handleChange = (e) => {
    // e.preventDefault()
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    const { name } = formData
    if (name && name.trim().length < 6) {
      setErr("Name must be atleast 6 characters")
    }
    else if (name && !(/^[\w\s]+$/).test(name)) {
      setErr(`Name can only contain letters and spaces.`)
    } else {
      setErr("")
    }
  }, [formData.name])

  useEffect(() => {
    const { password ,confPass} = formData
    if (password && password.length < 6) {
      setErr("Password must be atleast 6 characters")
    }
    else if (password && !(/^[\w\s#$%^&@]+$/).test(password)) {
      setErr(`Password can only contain letters and spaces.`)
    }
    else if (confPass && !(/^[\w\s#$%^&@]+$/).test(confPass)) {
      setErr(`confirm Password has same format as Password`)
    }

    else if (password && confPass && password !== confPass) {
      setErr('Passwords do not match')
    }
    else {
      setErr("")
    }
  }, [formData.password, formData.confPass])

  return (
    <div className="diagonal-split-background h-fit transition-all delay-1000 w-96 my-12 mx-auto">
      <ProgressBar width={'w-96'} value={value} textColor={''} />
      <h1 className="font-bold text-3xl pt-16 mb-3 text-white text-center uppercase">
        User SignUp
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
              value={formData.name}
              onBlur={handleBlur}
              // onChange={(e) => setName(e.target.value)}
              onChange={(e)=>handleChange(e)}
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
              value={formData.password}
              onBlur={handleBlur}
              onChange={handleChange}
            // onChange={(e) => setPassword(e.target.value.trim())}
            />
          </div>
          <div>
            <MdLockReset className="text-6xl text-emerald-900 absolute z-20 -ml-3" />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="my-3 h-8 w-full hover:border-none pl-14 p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
              name="confPass"
              id="confPass"
              value={formData.confPass}
              onBlur={handleBlur}
              onChange={handleChange}
            // onChange={(e) => setConfPass(e.target.value.trim())}
            />
          </div>
          <button className="uppercase rounded-3xl w-full p-2 my-5 font-bold bg-white text-gray-700 hover:bg-emerald-100">
            Signup
          </button>
          {Err ?
            <div className="bg-yellow-200 text-red-700 border-1 rounded-md p-1">{Err}</div> : ""
          }
        </form>
        <div>
          <p className="text-gray-400">Already have an Account? <Link to='/login' className="hover:text-white">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;   
