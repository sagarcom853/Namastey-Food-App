import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Modal from "./Modal/Modal";
import axios from "axios";
import { useAuth } from "./Context/AuthProvider";
import { useHook } from "../useHooks/CustomAPIHook";
import Tooltip from "@mui/material/Tooltip";
import { assets, cloudinaryImageId } from "../utils/constant";

const RestaurantCard = ({ data }) => {
  const [hoveredState] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user, setAuth, auth } = useAuth();
  const [err, setErr] = useState("");
  const { handleRemoveItem, hooksErr } = useHook();

  const isItemWishlisted = () => {
    if (user?.favourites?.restaurant) {
      return user.favourites.restaurant.some((item) => item.id === data.info.id);
    }
  };

  const handleAddtoFavourites = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/Addfavourites",
        {
          email: user.email,
          item: data.info,
          type: "restaurant",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAuth({ ...auth, isAuthenticated: true, user: response.data.user });
        setErr("");
      } else {
        setErr("Unexpected error occurred.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErr("Please login to add items to favourites...");
        } else {
          setErr(error.response.data.message || "An error occurred.");
        }
      } else if (error.request) {
        setErr("No response received from the server.");
      } else {
        setErr("Error setting up the request.");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErr("");
    }, 3000);
  }, [err]);

  const handleRemoveFromFavourites = (data) => {
    console.log(data);
    handleRemoveItem(user.email, data.info, "restaurant");
    console.log("hooksErr", hooksErr);
    console.log("done");
  };

  useEffect(() => {}, [user]);

  return (
    <div
      key={data.info.id}
      className='cursor-pointer hover: rounded-2xl hover:outline-0 w-72 h-90 mt-4 hover:shadow-2xl transition-all duration-300 '
    >
      <div className='flex flex-col'>
        <div className='h-48 w-60 mb-1 mx-auto relative'>
          <Link to={`/restaurant/${data.info.id}`}>
            <img
              alt='food menuitem'
              loading='lazy'
              rel='preconnect'
              className='h-full w-full rounded-xl object-cover'
              src={`${assets}${data.info.cloudinaryImageId}`}
            />
          </Link>
          {data.info.aggregatedDiscountInfoV3 && (
            <div className=' swiggy-header'>
              <div>{data.info.aggregatedDiscountInfoV3.header}</div> &nbsp;
              <div>{data.info.aggregatedDiscountInfoV3.subHeader}</div>
            </div>
          )}
          {user && isItemWishlisted() ? (
            <Tooltip title='Remove from favourites' arrow placement='top'>
              <img
                src='https://cdn-icons-png.flaticon.com/128/7245/7245139.png'
                alt='remove-wishlist-icon'
                className='image-absolute'
                onClick={() => handleRemoveFromFavourites(data)}
              />
            </Tooltip>
          ) : (
            <Tooltip title='Add to favourites' arrow placement='top'>
              <img
                src='https://icon-library.com/images/wishlist-icon/wishlist-icon-16.jpg'
                alt='wishlist-icon'
                className='image-absolute'
                onClick={() => handleAddtoFavourites(data)}
              />
            </Tooltip>
          )}
        </div>
      </div>

      <div className='flex flex-col mt-2 flex-wrap justify-center items-center w-60 mx-auto'>
        <div className='text-lg mb-2 text-gray-850 font-bold font-sans text-start'>{data.info.name}</div>
        {err ? <div className='p-1  rounded-md flex justify-center bg-red-600 text-white mb-4'>{err}</div> : ""}
        <div className='text-sm text-gray-600 h-10'>{data.info.cuisines?.join(", ")}</div>
        <div className='mt-4 text-gray-600'>
          <ul className=' text-sm flex flex-row gap-1 justify-start items-center '>
            <li className=' text-gray-600'>{data.info.sla.deliveryTime} MINS</li>
            <li className='text-gray-600'>{data.info.costForTwo}</li>
            <li className={` ${Number(data.info?.avgRating) > 4 ? "text-green-900" : "text-pink-900"}`}>
              <div className='flex items-center'>
                <StarIcon />
                {data.info?.avgRating}
              </div>
            </li>
            {data.info.isOpen ? (
              <li className='bg-green-100 p-1 rounded-md hover:bg-green-200 text-gray-600'>OPEN</li>
            ) : (
              <li className='bg-gray-300 p-1 rounded-md hover:bg-gray-600 hover:text-white text-gray-600'>CLOSED</li>
            )}
          </ul>
        </div>
        <div className='my-4 flex justify-center'>
          {hoveredState ? (
            <button
              className='text-center text-blue-600 font-semibold hover:text-gray-300 uppercase'
              onClick={() => setShowModal(!showModal)}
            >
              Quick View
            </button>
          ) : (
            ""
          )}
          <Modal modalContent={data} modalTitle={data.info.name} showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
    </div>
  );
};
export default RestaurantCard;

//higer order component to add label:
export const withPromotedRestuarant = (WrapperComponent) => {
  return (props) => {
    return (
      <div className='flex'>
        <label className='promoted absolute ml-6 mt-8 z-1000 bg-gray-700 text-white text-xs p-1 w-20 text-center font-semibold font-sans uppercase'>
          Promoted
        </label>
        <WrapperComponent data={props.data} />
      </div>
    );
  };
};
