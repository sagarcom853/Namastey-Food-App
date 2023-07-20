import { Link } from "react-router-dom";
import React, { useState } from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; 
// import { Carousel } from "react-responsive-carousel";

const RestaurantCard = ({ data, topRated, setTopRated }) => {
  const [hoveredState, setHoveredState] = useState(true);

  return (
    <div
      key={data.data.id}
      className='border-none hover:border-black w-72 h-90 p-4 mt-4 hover:shadow-2xl'
    >
      <div className='h-40 w-60 mx-auto'>
        <Link to={`/restaurant/${data.data.id}`}>
          <img
            alt='Food'
            className=' h-40 w-60 pt-2 hover:border-black'
            src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${data.data.cloudinaryImageId}`}
          />
        </Link>
      </div>

      <div className='my-4'>
        <div className='text-md text-gray-850 font-semibold font-sans text-start'>
          {data.data.name}
        </div>
        <div className='text-sm text-gray-600'>
          {data.data.cuisines.map((data) => data + ", ")}
        </div>
        <div className='mt-4 mx-4'>
          <ul className='list-disc flex flex-wrap justify-between'>
            <li className='text-sm text-gray-600'>
              {data.data.deliveryTime} MINS
            </li>
            <li className='text-sm text-gray-600'>
              {data.data.costForTwoString}
            </li>
          </ul>
        </div>
        <div className='my-4 flex justify-center'>
          {hoveredState ? (
            <button className='text-center text-blue-300 font-semibold hover:text-gray-600 uppercase'>
              Quick View
            </button>
          ) : (
            ""
          )}
        </div>

        <div className='open_status'>{data.data.open_status}</div>
      </div>
    </div>
  );
};
export default RestaurantCard;

//higer order component to add label:
export const withPromotedRestuarant = (RestaurantCard) => {
  return (props) => {
    return (
      <div className='flex relative'>
        <label className='absolute ml-3 mt-8 z-1 bg-gray-700 text-white text-xs p-1 w-20 text-center font-semibold font-sans uppercase'>
          Promoted
        </label>
        <RestaurantCard data={props.data} />
      </div>
    );
  };
};
