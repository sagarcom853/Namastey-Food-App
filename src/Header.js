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
          
            <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to='/help'>
            <span className="flex flex-row items-center justify-center gap-1">
              <svg
                className='stroke-current stroke-0 group-hover:fill-text-orange-400 transition-all duration-300 ease-in-out text-white'
                viewBox='6 -1 12 25'
                height='19'
                width='19'
                fill='#686b78'>
                <path d='M21.966903,13.2244898 C22.0156989,12.8231523 22.0408163,12.4145094 22.0408163,12 C22.0408163,11.8357822 22.036874,11.6724851 22.029079,11.5101984 L17.8574333,11.5102041 C17.8707569,11.6717062 17.877551,11.8350597 17.877551,12 C17.877551,12.4199029 17.8335181,12.8295214 17.749818,13.2244898 L21.966903,13.2244898 Z M21.5255943,15.1836735 L16.9414724,15.1836735 C15.8950289,16.8045422 14.0728218,17.877551 12,17.877551 C9.92717823,17.877551 8.1049711,16.8045422 7.05852762,15.1836735 L2.47440565,15.1836735 C3.80564362,19.168549 7.56739481,22.0408163 12,22.0408163 C16.4326052,22.0408163 20.1943564,19.168549 21.5255943,15.1836735 Z M21.7400381,9.55102041 C20.6468384,5.18931674 16.7006382,1.95918367 12,1.95918367 C7.2993618,1.95918367 3.3531616,5.18931674 2.25996187,9.55102041 L6.6553883,9.55102041 C7.58404845,7.5276442 9.62792376,6.12244898 12,6.12244898 C14.3720762,6.12244898 16.4159515,7.5276442 17.3446117,9.55102041 L21.7400381,9.55102041 Z M2.03309705,13.2244898 L6.25018203,13.2244898 C6.16648186,12.8295214 6.12244898,12.4199029 6.12244898,12 C6.12244898,11.8350597 6.1292431,11.6717062 6.14256675,11.5102041 L1.97092075,11.5102041 C1.96312595,11.6724851 1.95918367,11.8357822 1.95918367,12 C1.95918367,12.4145094 1.98430112,12.8231523 2.03309705,13.2244898 Z M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z M12,15.9183673 C14.1640545,15.9183673 15.9183673,14.1640545 15.9183673,12 C15.9183673,9.83594547 14.1640545,8.08163265 12,8.08163265 C9.83594547,8.08163265 8.08163265,9.83594547 8.08163265,12 C8.08163265,14.1640545 9.83594547,15.9183673 12,15.9183673 Z'></path>
              </svg>
              <p>Help</p>

          </span>
             
        </Link>

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
    </div >
  );
};
export default Header
