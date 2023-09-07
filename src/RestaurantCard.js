import { Link } from "react-router-dom";
import React, { useState } from "react";
import StarIcon from '@mui/icons-material/Star';

const RestaurantCard = ({ data }) => {
  const [hoveredState, setHoveredState] = useState(true);
  return (
    <div

      key={data.info.id}
      className='hover:border-gray-100 hover:border-2 hover:outline-0 w-72 h-90 p-4 mt-4 hover:shadow-2xl transition-all duration-300 ease-in-out'
    >
      <div className='h-40 w-60 mx-auto'>
        <Link to={`/restaurant/${data.info.id}`}>
          <img
            alt='Food'
            className=' h-40 w-60 pt-2 hover:border-black'
            src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${data.info.cloudinaryImageId}`}
          />
        </Link>
      </div>
      <div className='my-4'>
        <div className='text-md text-gray-850 font-semibold font-sans text-start'>
          {data.info.name}
        </div>
        <div className='text-sm text-gray-600'>
          {data.info.cuisines?.join(", ")}
        </div>
        <div className='mt-4 mx-4 text-gray-600'>
          <ul className='list-disc flex flex-wrap justify-between items-center'>
            <li className='text-sm text-gray-600'>
              {data.info.sla.deliveryTime} MINS
            </li>
            <li className='text-sm text-gray-600'>
              {data.info.costForTwo}
            </li>
            <li className={` ${Number(data.info?.avgRating) > 4 ? "text-green-600" : "text-orange-600"}`}>

              <StarIcon />{data.info?.avgRating}</li>
            {/* {data.info.isOpen ? <li className='text-sm bg-green-100 p-1 rounded-md hover:bg-green-200 text-gray-600'>
              OPEN
            </li> : <li className='text-sm bg-gray-300 p-1 rounded-md hover:bg-gray-600 hover:text-white text-gray-600'>
              CLOSED
            </li>} */}

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



