import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useOnlineStatus from "../useHooks/useOnLineStatus";
import { useSelector } from "react-redux";
import { useAuth } from "./Context/AuthProvider";
import axios from "axios";

const Header = () => {
  const weather_API = 'a2ac8f252952756e57ff657ad656e40d';
  const { isAuthenticated, logout, user } = useAuth();
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [cityData, setCityData] = useState();
  const [value, setValue] = useState('')
  const [dropDown, setDropDown] = useState(false)
  const onlineStatus = useOnlineStatus();
  const cart = useSelector((store) => store?.cart.items);
  const [locationchange, setLocationChange] = useState(false)

  const detectLocation = () => {
    navigator.geolocation.watchPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setLocationChange(true)
    });
  };

  const getLocation = () => {
    alert('location maang ')
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }

  async function getCity() {
    try {
      if (lat && long) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_API}`);
        setCityData(response.data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  useEffect(() => {
    getCity();
  }, [locationchange]);

  const setLogout = () => {
    logout()
    setDropDown(false)
  }

  return (
    <div className='flex flex-col shadow-lg md:flex md:flex-row py-4'>
      <ul className='ml-2 flex flex-wrap justify-start items-center font-medium gap-3'>
        <li>
          <Link to='/home'>
            <img
              src='https://tse3.mm.bing.net/th?id=OIP.Oap-2kGS3d-eEpnau9qIKAHaEI&pid=Api&P=0'
              alt='food logo'
              className='w-20 h-11 rounded-md bg-transparent'
            />
          </Link>
        </li>
        <li>
          <Link className='flex flex-nowrap hover:text-orange-400 transition-all duration-300 ease-in-out' to='/home'>
            <p>OnlineStatus:</p> {onlineStatus ? "🟢" : "🔴"}
          </Link>
        </li>
        <li>
          {!isAuthenticated ? <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to="/login">Login</Link> : ''}
        </li>
        <li>
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to='/home'>Home</Link>
        </li>
        <li>
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to='/help'>Help</Link>
        </li>
        <li>
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to='/about'>About</Link>
        </li>
        <li>
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" to='/cart'>
            <span className="text-sm"><AddShoppingCartIcon /></span>
            {cart.length} items
          </Link>
        </li>
        {/* <li>
          <input type='text' className='input-field' placeholder="Enter Location" value={value} onChange={(e) => setValue(e.target.value)} />
          <button className="button" onClick={getLocation}>Search</button>
        </li> */}
        {/* <li>
        
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" onClick={detectLocation}>
            Detect my location:
          </Link>
          &nbsp;&nbsp;{cityData?.name || ''}
        </li> */}


        {/* <div className="user-menu"> */}
        <li className="flex-grow"></li>
        {user.name ?
          <li className="flex justify-end ml-auto">
            <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out flex justify-end" onClick={() => setDropDown(!dropDown)}>
              <div className='dropdown'>
                <div className="flex gap-1">
                  <img src='https://www.pngfind.com/pngs/m/378-3780189_member-icon-png-transparent-png.png' alt='member-icon' className="bg-black text-white h-8 w-8" />
                  {user && user.name}
                </div>
                <div className="dropdown-content" style={{ visibility: dropDown ? '' : 'hidden' }}>
                  <Link className='hover:text-orange-400 transition-all duration-300 ease-in-out flex justify-end' to='/profile'>My Profile</Link>
                  <Link className='hover:text-orange-400 transition-all duration-300 ease-in-out flex justify-end' to='/orders'> My Orders</Link>
                  <Link className='hover:text-orange-400 transition-all duration-300 ease-in-out flex justify-end' to='/favourites'> My Favourites</Link>
                  <Link className='hover:text-orange-400 transition-all duration-300 ease-in-out flex justify-end' onClick={setLogout}>Logout</Link>
                </div>
              </div>
            </Link>
          </li> : ''
        }
      </ul>
    </div >
  );
};

export default Header;
