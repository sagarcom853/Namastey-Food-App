import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useOnlineStatus from "./useHooks/useOnLineStatus";
import { useSelector } from "react-redux";
import { useAuth } from "./Context/AuthProvider";

const Header = () => {
  const { isAuthenticated, logout } = useAuth()
  const onlineStatus = useOnlineStatus();
  const cart = useSelector((store) => store?.cart.items)

  return (
    <div className='flex flex-col justify-between border border-black md:flex md:flex-row  py-4 text-white bg-black'>
      <ul className='ml-2 flex flex-wrap justify-start items-center font-medium gap-3'>
        <li>
          <Link to='/'>
            <img
              src='https://tse3.mm.bing.net/th?id=OIP.Oap-2kGS3d-eEpnau9qIKAHaEI&pid=Api&P=0'
              alt='food logo'
              className='w-16 h-12 rounded-md bg-transparent'
            />
          </Link>
        </li>
        <li>
          <Link className='flex flex-nowrap hover:text-orange-400 transition-all duration-300 ease-in-out' to='/'>
            <p>OnlineStatus:</p> {onlineStatus ? "🟢" : "🔴"}
          </Link>
        </li>
        <li>
          {!isAuthenticated ? <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to="/login">Login</Link> : <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" onClick={logout}>Logout</Link>}
        </li>
        <li>
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to='/'>Home</Link>
        </li>
        <li>
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to='/about'>About</Link>
        </li>
        <li>
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to='/cart'>
            {/* <IconButton color='secondary' aria-label='add to shopping cart'> */}
            <span className="text-sm"><AddShoppingCartIcon /></span>
            {cart.length} items
            {/* </IconButton> */}
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Header
