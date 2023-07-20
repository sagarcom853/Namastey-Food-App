import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useOnlineStatus from "./useHooks/useOnLineStatus";
import PasswordGenerate from "./passwordGeneratorNew/PasswordGenerate";
import Login from "./authentication/Login";

const Header = ({ textFieldValue, plates }) => {
  const onlineStatus = useOnlineStatus();
  useEffect(() => {}, [textFieldValue]);

  return (
    <div className='flex justify-start w-full mx-auto flex-wrap items-center p-2 bg-emerald-200 hover:bg-emerald-300 shadow-lg rounded-sm'>
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
          <Link className='flex flex-nowrap' to='/'>
            <p>OnlineStatus:</p> {onlineStatus ? "🟢" : "🔴"}
          </Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>SignUp</Link>
        </li>
        <li>
          <Link to='/grocery'>Grocery</Link>
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
        <li>
          <Link to='/generate-password'>GeneratePassword</Link>
        </li>
        <li>
          <Link to='/generate-password2'>PassGen</Link>
        </li>
        <li>
          <Link to='/cart'>
            <Badge color='secondary' badgeContent={plates}>
              <IconButton color='secondary' aria-label='add to shopping cart'>
                <AddShoppingCartIcon />
              </IconButton>
            </Badge>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Header;
