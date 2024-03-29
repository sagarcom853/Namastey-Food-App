import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import useOnlineStatus from "../useHooks/useOnLineStatus";
import { useSelector } from "react-redux";
import { useAuth } from "./Context/AuthProvider";
import axios from "axios";
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PlaceIcon from '@mui/icons-material/Place';
import { weather_API } from "../utils/constant";


export const getCity = async (lat, long, setCityData) => {
  try {
    console.log('inside here')
    if (lat && long) {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_API}`);
      setCityData(response.data);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [cityData, setCityData] = useState();
  const [value, setValue] = useState('')
  const [dropDown, setDropDown] = useState(false)
  const onlineStatus = useOnlineStatus();
  const cart = useSelector((store) => store?.cart.items);
  const [locationchange, setLocationChange] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for handling menu toggle
  const [screenWidth, setScreenWidth] = useState('')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const detectLocation = () => {
    navigator.geolocation.watchPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      setLocationChange(true)
    });
  };

  // async function getCity() {
  //   try {
  //     if (lat && long) {
  //       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_API}`);
  //       setCityData(response.data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //   }
  // }

  useEffect(() => {
    getCity();
  }, [locationchange]);

  useEffect(() => {
    function handleResize() {
      console.log('window.innerWidth', window.innerWidth)
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const setLogout = () => {
    logout()
    setDropDown(false)
  }

  return (
    <div className='flex flex-col md:flex md:flex-row py-4 shadow-lg' data-testid="header-component">
      <div className="flex">
        {screenWidth.toString() > '300px' && screenWidth.toString() < '768px' ?
          <IconButton
            onClick={toggleMenu}
            className="md:hidden lg:hidden m-2  p-2"
          >
            <MenuIcon
              name='menu'
            />
          </IconButton>
          : ''
        }

        <Link to='/home'>
          <img
            src='https://tse3.mm.bing.net/th?id=OIP.Oap-2kGS3d-eEpnau9qIKAHaEI&pid=Api&P=0'
            alt='food logo'
            className={`${screenWidth.toString() > '300px' && screenWidth.toString() < '768px' ? 'absolute right-6' : 'ml-4'} w-20 h-11 rounded-md bg-transparent`}
          />
        </Link>

      </div>
      <ul className={`ml-2 gap-4 md:flex md:flex-wrap md:justify-start  z-100 md:items-center md:font-medium  ${isMenuOpen ? '' : 'hidden'} ${screenWidth.toString() > '300px' && screenWidth.toString() < '768px' ? 'hamburger-open' : ''}`}>
        {isMenuOpen && <div>Menu is open</div>}
        <li>
          <Link className='flex flex-nowrap hover:text-orange-400 transition-all duration-300 ease-in-out' to='/home' >
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
        <li>
          <Link className="hover:text-orange-400 transition-all duration-300 ease-in-out" onClick={() => detectLocation()}>
            <div className="flex ">
              <PlaceIcon />
              {cityData ? cityData?.name : 'detect Location'}
            </div>

          </Link>
        </li>
        {user && user.name ?
          <li className="flex justify-end ml-auto lg:absolute lg:right-10" onMouseEnter={() => setDropDown(true)} onMouseLeave={() => setDropDown(false)}>
            <div className='dropdown'>
              <div className="flex items-center gap-1 cursor-pointer">
                {/* <img src='https://www.pngfind.com/pngs/m/378-3780189_member-icon-png-transparent-png.png' alt='member-icon' className="bg-black text-white h-8 w-8" /> */}
                <Stack direction="row" spacing={2}>
                  <Avatar alt={user.name} src="/static/images/avatar/2.jpg" sx={{ bgcolor: !dropDown ? '#00416a' : deepOrange[500] }} />
                </Stack>
                {user && user.name} {user.isAdmin && <div className=' text-sm p-0 m-0 text-center w-16 bg-[#00416a] text-white rounded-xl'>Admin*</div>}
              </div>
              <div className="dropdown-content" style={{ visibility: dropDown ? '' : 'hidden' }}>
                <Link className='hover:text-orange-400 flex justify-end' to='/profile'>My Profile</Link>
                <Divider orientation="horizontal" flexItem />
                <Link className='hover:text-orange-400 flex justify-end' to='/orders'> My Orders</Link>
                <Divider orientation="horizontal" flexItem />
                <Link className='hover:text-orange-400 flex justify-end' to='/favourites'> My Favourites</Link>
                <Divider orientation="horizontal" flexItem />
                {user.isAdmin &&
                  <>
                    <Link className='hover:text-orange-400 flex justify-end' to='/AllUsers'> All users</Link>
                    <Divider orientation="horizontal" flexItem />
                    <Link className='hover:text-orange-400 flex justify-end' to='/AllOrders'> All Orders</Link>
                    <Divider orientation="horizontal" flexItem />
                  </>

                }
                <Link className='hover:text-orange-400 flex justify-end' onClick={setLogout}>Logout</Link>
              </div>
            </div>
          </li> : ''
        }
      </ul>
    </div >
  );
};


export default Header;
