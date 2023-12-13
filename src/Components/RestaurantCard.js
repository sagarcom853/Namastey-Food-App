import { Link } from "react-router-dom";
import React, { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import Modal from "./Modal/Modal";


const RestaurantCard = ({ data }) => {
  const [hoveredState] = useState(true);
  const [showModal, setShowModal] = useState(false)


  return (
    <div
      key={data.info.id}
      className='hover:border-gray-100 cursor-pointer hover:border-2 hover: rounded-2xl hover:outline-0 w-72 h-90 mt-4 hover:shadow-2xl transition-all duration-300 ease-in-out'
    >
      <div className='h-40 w-60 mb-1 mx-auto  '>
        <Link to={`/restaurant/${data.info.id}`}>
          <img
            alt='Food'
            // loading='lazy'
            rel="preconnect"
            className=' h-42 w-64 pt-4 hover:border-black object-contain '
            src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${data.info.cloudinaryImageId}`}
          />
        </Link>
      </div>
      <div className='flex flex-col mt-2 flex-wrap justify-center items-center w-60 mx-auto'>
        <div className='text-md mb-1 text-gray-850 font-semibold font-sans text-start'>
          {data.info.name}
        </div>
        <div className='text-sm text-gray-600'>
          {data.info.cuisines?.join(", ")}
        </div>
        <div className='mt-4 text-gray-600'>
          <ul className='flex flex-row flex-wrap gap-2 justify-start items-center '>
            <li className='text-sm text-gray-600'>
              {data.info.sla.deliveryTime} MINS
            </li>
            <li className='text-sm text-gray-600'>
              {data.info.costForTwo}
            </li>
            <li className={` ${Number(data.info?.avgRating) > 4 ? "text-green-900" : "text-pink-900"}`}>

              <StarIcon />{data.info?.avgRating}</li>
            {data.info.isOpen ? <li className='text-sm bg-green-100 p-1 rounded-md hover:bg-green-200 text-gray-600'>
              OPEN
            </li> : <li className='text-sm bg-gray-300 p-1 rounded-md hover:bg-gray-600 hover:text-white text-gray-600'>
              CLOSED
            </li>}

          </ul>
        </div>
        <div className='my-4 flex justify-center'>
          {hoveredState ? (
            <button className='text-center text-blue-600 font-semibold hover:text-gray-300 uppercase' onClick={() => setShowModal(!showModal)}>
              Quick View
            </button>
          ) : (
            ""
          )}
          <Modal
            modalContent={data}
            modalTitle={data.info.name}
            showModal={showModal}
            setShowModal={setShowModal} />
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
      <div className='flex relative'>
        <label className='absolute ml-3 mt-8 z-1 bg-gray-700 text-white text-xs p-1 w-20 text-center font-semibold font-sans uppercase'>
          Promoted
        </label>
        <WrapperComponent data={props.data} />
      </div>
    );
  };
};



