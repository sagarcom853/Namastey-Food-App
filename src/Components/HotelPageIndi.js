/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShimmerUi from "../useHooks/ShimmerUi";
import { useAuth } from "./Context/AuthProvider";
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from "react-redux";
import ItemList from "./ItemList"
import ScrollTop from "../utils/ScrollToTop";

const HotelPageIndi = () => {
  const [restaurantMenuData, setRestaurantMenuData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('')
  const [vegLabel, setVegLabel] = useState(false)
  const { id } = useParams();
  let navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const darkMode = useSelector((store) => store.cart?.dark)


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
        data?.data?.cards?.map((d) => {
          if (d.groupedCard) {
            setRestaurantMenuData(d.groupedCard.cardGroupMap.REGULAR.cards);
          }
        });
      }
    } catch (error) {
      setErrorMessage(error)
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [id]);

  if (restaurantInfo.length === 0 || restaurantMenuData.length === 0) {
    return <ShimmerUi />;
  }

  const getCuisines = () => {
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

  const { cuisines, slaString, randmMessage, costForTwoMessage } =
    getCuisines();

  const renderAfterVegLabel = (result, item) => {
    if (vegLabel) {
      return result.map((it) => {
        return (
          <div
            key={it.card.info.name}
            className='flex flex-wrap justify-between my-6'
          >
            <ItemList it={it} cloudinaryImageId={cloudinaryImageId} vegLabel={vegLabel} />
            <div>
            </div>
          </div>
        )
      })
    }
    else {
      return item.card?.card?.itemCards?.map((it, index) => {
        return (
          <div
            key={it.card.info.name}
            className='my-6'
          >
            <ItemList it={it} cloudinaryImageId={cloudinaryImageId} vegLabel={vegLabel} />
            <div className="flex justify-between p-4 border-b border-gray-300">
            </div>
          </div>
        );
      })
    }
  }

  const results = () =>
    restaurantMenuData &&
    restaurantMenuData?.map((item) => {
      let result = []
      if (item.card.card.itemCards) {
        let lengthOfCards = 0
        if (vegLabel) {
          result = item.card.card.itemCards?.filter((iterator) => {
            let veg = iterator.card.info.itemAttribute?.vegClassifier === "VEG"
            if (veg) {
              lengthOfCards++
              return veg
            }
          })
        }




        return (
          <div className={`mt-1 mb-3  ${darkMode ? 'darkModeCSS' : 'bg-green-500'}`} key={item.card.card.title}>
            {(!vegLabel || lengthOfCards > 0) && (
              <Accordion className={`mt-1 mb-3 ${darkMode ? 'darkModeCSS' : ' text-blue-600 bg-green-500'}`} >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                  className={`${darkMode ? 'darkModeCSS' : 'bg-green-900'}`}
                >
                  <Typography className='font-sans font-semibold'>
                    {vegLabel && lengthOfCards > 0
                      ? `${item.card.card.title} (${lengthOfCards})`
                      : `${item.card.card.title} (${item.card.card.itemCards?.length})`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>
                      {renderAfterVegLabel(result, item)}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}
          </div>
        );
      }
      return null;
    });

  const vegOnly = () => {
    return restaurantMenuData &&
      restaurantMenuData?.map((menuItem) => {
        const vegDetails = menuItem?.card?.card?.vegOnlyDetails
        if (vegDetails) {
          return (
            <div key={vegDetails.description} className='my-3'>
              <input type='checkbox' className='' name='veg' id='veg' onChange={() => setVegLabel(!vegLabel)} />
              <label htmlFor='veg' className='ml-2 text-gray-600 text-sm'>
                {'Veg Only'}
              </label>
              {/* <img alt="veg" loading='lazy' src={cloudinaryImageId + vegDetails.imageId}></img> */}
            </div>
          )
        }
      })

  }

  const basicDetails = () => {
    function links() {
      return (
        <div className='flex flex-wrap gap-4 justify-end mb-6'>
          <Link to='/'>
            <button className='bg-emerald-200 hover:bg-emerald-400  hover:shadow-2xl p-1 w-24 rounded-md uppercase transition-all duration-300 ease-in-out' onClick={() => navigate(-1)}>
              home
            </button>
          </Link>

          <Link to={isAuthenticated ? "/cart" : "/login"}>
            <button className='bg-purple-200 hover:bg-purple-400 hover:shadow-2xl p-1 w-24 rounded-md uppercase transition-all duration-300 ease-in-out' >
              Cart
            </button>
          </Link>
        </div>
      )
    }
    return (
      <div className=''>
        {links()}
        <div className="flex flex-wrap justify-between">
          <div className='font-semibold text-lg'>{restaurantInfo?.name}</div>
          <div className="flex flexwrap flex-col p-1 bg-gray-100 shadow-lg w-20">
            <p className={`items-center text-center flex justify-center ${Number(restaurantInfo?.avgRatingString) > 4.5 ? "text-green-600" : "text-orange-600"}`}><StarIcon />{restaurantInfo?.avgRatingString}</p>
            <div className="flex justify-between border-b border-gray-500">
            </div>
            <p className="text-xs text-gray-500 flex justify-center text-center">{restaurantInfo?.totalRatingsString}</p>
          </div>
        </div> <div className='text-gray-600 text-md'>{cuisines}</div>
        <div className='flex flex-wrap justify-start'>
          <div className='text-gray-600 text-sm'>
            {restaurantInfo.areaName},&nbsp;{restaurantInfo.city},&nbsp;
          </div>
          <div className='text-gray-600 text-sm'>
            &nbsp;{restaurantInfo.sla.lastMileTravelString}
          </div>
        </div>
        {/* <div className='flex flex-wrap mt-3 gap-2'>
          <img
            alt='order icon'
            className='h-6 w-6'
            src={cloudinaryIdIcon + restaurantInfo.feeDetails.icon}
          />
          <div className='text-gray-600 text-sm'>{randmMessage}</div>
        </div> */}
        <div className='flex flex-wrap font-bold mt-3 justify-start gap-8'>
          <div className='text-gray-600 text-sm'>{slaString}</div>
          <div className='text-gray-600 text-sm'>{costForTwoMessage}</div>
        </div>

        {/* <div className=' text-gray-200 border-solid border-gray-400 underline'>_______________________________________________________________________________________________________________________________</div> */}
        {vegOnly()}
      </div>
    );
  };


  return (
    <div className={`w-4/5 mx-auto mt-4 `}>
      {basicDetails()}
      {results()}
      <ScrollTop showBelow={500} />
    </div>
  );
};

export default HotelPageIndi;



