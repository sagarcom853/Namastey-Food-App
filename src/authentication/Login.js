import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdLockReset } from "react-icons/md";

const Login = () => {
  return (
    <div className="diagonal-split-background w-96 h-96 mx-auto my-8">
      <h1 className="font-bold text-3xl pt-16 mb-3 text-white text-center uppercase">
        User Login
      </h1>
      <div className="w-64 mx-auto relative">
        <form className="">
          <div className="relative flex">
            <MdAccountCircle className="text-6xl text-emerald-900 outline-black absolute box-border z-20 -ml-3" />
            <input
              type="text"
              placeholder="      Username"
              required
              className="my-3 w-full h-8 box-border hover:border-none p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
              name="name"
              id="name"
              // value={name}
              // onChange={handleChange}
            />
          </div>
          <div>
            <MdLockReset className="text-6xl text-emerald-900 absolute z-20 -ml-3" />
            <input
              type="password"
              placeholder="      Password"
              required
              className="my-3 h-8 w-full hover:border-none p-5 rounded-3xl bg-emerald-100 focus:outline-none focus:outline-emerald-900"
              name="password"
              id="password"
              // value={name}
              // onChange={handleChange}
            />
          </div>
          <button className="uppercase rounded-3xl w-full p-2 my-5 font-bold bg-white text-gray-700 hover:bg-emerald-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
