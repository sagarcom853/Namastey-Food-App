import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdLockReset } from "react-icons/md";
import { useAuth } from "../Context/AuthProvider";
import { Navigate, useNavigate, Link } from "react-router-dom";
import ProgressBar from "../../Progressbar/ProgressBar";
import axios from 'axios'

const Signup = () => {
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: 'male',
    dob: '',
    add1: '',
    add2: '',
    landmark: '',
    pin: '',
    state: '',
    country: '',
    confPass: "",
    imageURL: '',
    isAdmin: false
  });
  const [Err, setErr] = useState("");
  const [value, setvalue] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true)
    console.log("formData", formData);
    if (Err === "") {
      try {
        console.log('inside try')
        const response = await axios.post(
          "http://localhost:8000/user/create",
          formData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log('response from backend', response);
        login(response.data.user);
        setButtonLoading(false)
        navigate('/home', { state: { email: formData.email } });

      } catch (error) {
        setButtonLoading(false)
        console.error('Error during API request:', error);

        // any response from the errors
        if (error.response) {
          setErr(error.response.data.message)
        }
        // if request was sent but no response received
        else if (error.request) {
          setErr("No response received from server....")
        }
        // mistake setting up request
        else {
          setErr("Error setting up request")
        }
      }


    }
  };

  const handleBlur = () => {
    let progress = 0;
    Object.values(formData).forEach((value) => {
      if (value !== "") {
        progress += Math.ceil(100 / Object.keys(formData).length);
        progress = Math.min(progress, 100);
      }
    });
    setvalue(progress);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isAdmin') {
      setFormData({ ...formData, [name]: e.target.checked })
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const { name } = formData;
    if (name && name.trim().length < 6) {
      setErr("Name must be at least 6 characters");
    } else if (name && !(/^[\w\s]+$/).test(name)) {
      setErr(`Name can only contain letters and spaces.`);
    } else {
      setErr("");
    }
  }, [formData.name]);

  useEffect(() => {
    const { email } = formData;
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErr("Invalid email address");
    } else {
      setErr("");
      setButtonLoading(false)
    }
  }, [formData.email]);

  useEffect(() => {
    const { password, confPass } = formData;
    if (password && password.length < 6) {
      setErr("Password must be at least 6 characters");
    } else if (password && !(/^[\w\s#$%^&@]+$/).test(password)) {
      setErr(`Password can only contain letters and spaces.`);
    } else if (confPass && !(/^[\w\s#$%^&@]+$/).test(confPass)) {
      setErr(`Confirm Password has the same format as Password`);
    } else if (password && confPass && password !== confPass) {
      setErr('Passwords do not match');
    } else {
      setErr("");
      setButtonLoading(false)
    }
  }, [formData.password, formData.confPass]);

  let formValid = formData.name.length > 0 && formData.email.length > 0 && formData.password.length > 0 && formData.confPass.length > 0

  return (
    <div className="relative">
      <div>
        <img src='https://images.pexels.com/photos/12234385/pexels-photo-12234385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='' className="login-food-image" />
      </div>
      <div className="bg-[#461021bd] absolute right-0 left-0 top-0 rounded-lg h-fit transition-all delay-1000 w-96 my-6 mx-auto">
        <h1 className="font-bold text-3xl pt-16 mb-3 text-white text-center uppercase">
          User SignUp
        </h1>
        <div className="w-64 mx-auto relative">
          <form className="" onSubmit={handleSubmit}>
            <div className="relative flex">
              <MdAccountCircle className="text-6xl text-emerald-900 outline-black absolute box-border z-20 -ml-3" />
              <input
                type="text"
                placeholder="User Name"
                // required
                className="my-3 w-full h-8 box-border hover:border-none pl-14 p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
                name="name"
                id="name"
                value={formData.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            <div className="relative flex">
              <MdAccountCircle className="text-6xl text-emerald-900 outline-black absolute box-border z-20 -ml-3" />
              <input
                type="email"
                placeholder="Email"
                // required
                className="my-3 w-full h-8 box-border hover:border-none pl-14 p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
                name="email"
                id="email"
                value={formData.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            <div className="relative flex">
              <MdLockReset className="text-6xl text-emerald-900 absolute z-20 -ml-3" />
              <input
                type="password"
                placeholder="Password"
                // required
                className="my-3 h-8 w-full hover:border-none pl-14 p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
                name="password"
                id="password"
                value={formData.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="relative flex">
              <MdLockReset className="text-6xl text-emerald-900 absolute z-20 -ml-3" />
              <input
                type="password"
                placeholder="Confirm Password"
                // required
                className="my-3 h-8 w-full hover:border-none pl-14 p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
                name="confPass"
                id="confPass"
                value={formData.confPass}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              <input type="checkbox" className="cursor-pointer" name='isAdmin' id='isAdmin' onChange={handleChange} />
              <label htmlFor='isAdmin' className="ml-2 text-white text-sm cursor-pointer">Are you an Admin?</label>
            </div>
            <button className={`uppercase rounded-3xl w-full p-2 my-5 font-bold bg-white text-gray-700 hover:bg-emerald-100 ${Err || buttonLoading || !formValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={Err || buttonLoading || !formValid}
            >
              {buttonLoading ? "Loading..." : "Sign up"}
            </button>
            {Err ? (
              <div className="bg-red-600 text-white flex justify-center rounded-md p-1 mb-4">{Err}</div>
            ) : (
              ""
            )}
          </form>
          <p className="text-sm -mt-5 text-gray-400 my-2">By clicking signup, I accept the terms and conditions of the policy.</p>
          <div>
            <p className="text-gray-400">
              Already have an Account? <Link to="/login" className="hover:text-white">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signup;
