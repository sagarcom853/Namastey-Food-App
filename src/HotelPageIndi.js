/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShimmerUi from "./useHooks/ShimmerUi";

const HotelPageIndi = () => {
  const [restaurantMenuData, setRestaurantMenuData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  let RestuarantMenuAPI = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.9319838&lng=86.7465928&restaurantId=${id}&submitAction=ENTER`;
  let cloudinaryIdIcon =
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/";
  let cloudinaryImageId =
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
  const fetchMenu = async () => {
    try {
      const { data } = await axios.get(RestuarantMenuAPI);

      setRestaurantInfo(data.data.cards[0].card.card.info);
      {
        data.data.cards.map((d) => {
          if (d.groupedCard) {
            setRestaurantMenuData(d.groupedCard.cardGroupMap.REGULAR.cards);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [id]);

  if (restaurantInfo.length === 0 || restaurantMenuData.length === 0) {
    return <ShimmerUi />;
  }

  console.log(id);

  const getCuisines = () => {
    console.log("restaurantInfo", restaurantInfo);
    if (restaurantInfo) {
      const cuisines = restaurantInfo.cuisines?.join(", ");
      return {
        cuisines,
        slaString: restaurantInfo.sla.slaString,
        randmMessage: restaurantInfo.feeDetails.message,
        costForTwoMessage: restaurantInfo.costForTwoMessage,
      };
    }
    return {
      cuisines: "",
      slaString: "",
      randmMessage: "",
      costForTwoMessage: "",
    };
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const { cuisines, slaString, randmMessage, costForTwoMessage } =
    getCuisines();

  const results = () =>
    restaurantMenuData &&
    restaurantMenuData.map((item) => {
      if (item.card.card.itemCards) {
        return (
          <div className='mt-1 mb-3 bg-gray-300' key={item.card.card.title}>
            <Accordion className='bg-gray-300'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography className='font-sans font-semibold'>
                  {item.card.card.title} ({item.card.card.itemCards?.length})
                  {/* {item.card.card.title} */}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div>
                    {item.card.card.itemCards.map((it, index) => {
                      return (
                        <div
                          key={it.card.info.name}
                          className='flex flex-wrap justify-between my-6'
                        >
                          <div>
                            <div className='text-md w-[6]'>
                              {it.card.info.name}
                            </div>
                            <div className='text-sm'>
                              &#8377;{it.card.info.price / 100}
                            </div>
                            <div className='text-sm mt-3 font-sans text-gray-400 w-[10]'>
                              {it.card.info.description}
                            </div>
                            {/* {index===it.card.length-1? '':  <div className='text-gray-200 mt-10'>__________________________________________________________________________</div>} */}
                          </div>
                          <div>
                            {it.card.info.imageId ? (
                              <div className='relative'>
                                <img
                                  alt='food'
                                  className='h-24 w-28 rounded-md'
                                  src={cloudinaryImageId + it.card.info.imageId}
                                />
                                <button
                                  className='uppercase text-green-300 absolute z-10 bg-white shadow-md hover:shadow-2xl hover:bg-gray-200 border-green-800 h-8 mx-4 -mt-5 rounded-md w-20'
                                  onClick={handleShowModal}
                                >
                                  Add
                                </button>
                              </div>
                            ) : (
                              <button className='uppercase text-green-300 bg-white shadow-md hover:shadow-2xl h-10 hover:bg-gray-200 border-green-800 mx-4 rounded-md w-20'>
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      }
      return null;
    });

  const basicDetails = () => {
    return (
      <div className=''>
        <div className='flex flex-wrap justify-end mb-3'>
          <Link to='/'>
            <button className='bg-emerald-200 hover:bg-emerald-400 hover:shadow-2xl p-1 w-24 rounded-sm uppercase'>
              home
            </button>
          </Link>
        </div>
        <div className='font-semibold text-lg'>{restaurantInfo?.name}</div>
        <div className='text-gray-600 text-sm'>{cuisines}</div>
        <div className='flex flex-wrap justify-start'>
          <div className='text-gray-600 text-sm'>
            {restaurantInfo.areaName},&nbsp;{restaurantInfo.city},&nbsp;
          </div>
          <div className='text-gray-600 text-sm'>
            &nbsp;{restaurantInfo.sla.lastMileTravelString}
          </div>
        </div>
        <div className='flex flex-wrap mt-3 gap-2'>
          <img
            alt='order icon'
            className='h-6 w-6'
            src={cloudinaryIdIcon + restaurantInfo.feeDetails.icon}
          />
          <div className='text-gray-600 text-sm'>{randmMessage}</div>
        </div>
        <div className='flex flex-wrap font-bold mt-3 justify-start gap-8'>
          <div className='text-gray-600 text-sm'>{slaString}</div>
          <div className='text-gray-600 text-sm'>{costForTwoMessage}</div>
        </div>
        {/* <div className=' text-gray-200 border-solid border-gray-400 underline'>_______________________________________________________________________________________________________________________________</div> */}

        <div className='my-3'>
          <input type='checkbox' className='' name='veg' id='veg' />
          <label htmlFor='veg' className='ml-2 text-gray-600 text-sm'>
            Veg Only
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className='  w-4/5 mx-auto mt-4'>
      {basicDetails()}
      {results()}
    </div>
  );
};

export default HotelPageIndi;
