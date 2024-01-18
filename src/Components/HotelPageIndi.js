/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShimmerUi from "../useHooks/ShimmerUi";
import { useAuth } from "./Context/AuthProvider";
import StarIcon from "@mui/icons-material/Star";
import { useSelector } from "react-redux";
import ItemList from "./ItemList";
import ScrollTop from "../utils/ScrollToTop";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SearchBar from "./Filters/SearchBar";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const HotelPageIndi = () => {
  const [restaurantMenuData, setRestaurantMenuData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [vegLabel, setVegLabel] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("")
  const { id } = useParams();
  let navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const darkMode = useSelector((store) => store.cart?.dark);

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
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [id]);

  if (restaurantInfo.length === 0 || restaurantMenuData.length === 0) {
    return (
      <div className="flex flex-wrap">
        <ShimmerUi />
      </div>
    );
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
    if (vegLabel || textFieldValue) {
      return result.map((it) => (
        <div
          key={it.card.info.name}
          className="flex flex-wrap justify-between my-6"
        >
          <ItemList
            it={it}
            cloudinaryImageId={cloudinaryImageId}
            vegLabel={vegLabel}
            restaurantInfo={restaurantInfo}
          />
          <div></div>
        </div>
      ));
    } else {
      return item.card?.card?.itemCards?.map((it, index) => (
        <div key={it.card.info.name} className="my-6">
          <ItemList
            it={it}
            cloudinaryImageId={cloudinaryImageId}
            vegLabel={vegLabel}
            restaurantInfo={restaurantInfo}
          />
          <div className="flex justify-between p-4 border-b border-gray-300"></div>
        </div>
      ));
    }
  };

  const results = () =>
    restaurantMenuData &&
    restaurantMenuData?.map((item) => {
      let result = [];
      if (item.card.card.itemCards) {
        let lengthOfCards = 0;
        if (vegLabel) {
          result = item.card.card.itemCards?.filter((iterator) => {
            let veg =
              iterator.card.info.itemAttribute?.vegClassifier === "VEG";
            console.log("veg", veg)
            if (veg) {
              lengthOfCards++;
              return veg;
            }
          });
        }

        if (textFieldValue) {
          lengthOfCards = 0
          let resultant = []
          if (vegLabel) {
            resultant = result
          } else {
            resultant = item.card.card.itemCards
          }
          result = resultant.filter((iterator) => {
            let filter = (iterator.card.info.name).toLowerCase().includes(textFieldValue.toLowerCase())
            if (filter) {
              ++lengthOfCards
              console.log('length of cards', lengthOfCards)
              return filter
            }
          })
          console.log("resultr", result)
        }


        { console.log("length of cards outside", lengthOfCards) }
        return (
          <div
            className={`mt-1 mb-3 ${darkMode ? "darkModeCSS" : "bg-green-500"
              }`}
            key={item.card.card.title}
          >
            {((!vegLabel && !textFieldValue) || lengthOfCards > 0) && (
              <Accordion
                className={`mt-1 mb-3 ${darkMode ? "darkModeCSS" : " text-blue-600 bg-green-500"
                  }`}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className={`${darkMode ? "darkModeCSS" : "bg-green-900"}`}
                >
                  <Typography className="font-sans font-semibold">
                    {
                      (vegLabel || textFieldValue) && lengthOfCards > 0
                        ? `${item.card.card.title} (${lengthOfCards})`
                        : `${item.card.card.title} (${item.card.card.itemCards?.length})`}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>{renderAfterVegLabel(result, item)}</div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}
          </div>
        );
      }
      return null;
    });

  const vegOnly = () =>
    restaurantMenuData &&
    restaurantMenuData?.map((menuItem) => {
      const vegDetails = menuItem?.card?.card?.vegOnlyDetails;
      if (vegDetails) {
        return (
          <div key={vegDetails.description} className="my-3">
            <input
              type="checkbox"
              className="cursor-pointer"
              name="veg"
              id="veg"
              checked={vegLabel}
              onChange={() => setVegLabel(!vegLabel)}
            />
            <label htmlFor="veg" className="ml-2 text-gray-600 text-sm cursor-pointer">
              Veg Only
            </label>
            {/* <img alt="veg" loading="lazy" src={cloudinaryImageId + vegDetails.imageId}></img> */}
          </div>
        );
      }
    });

  const handleDelete = () => {
    setVegLabel(false)
  }
  const handleClick = () => {
    setVegLabel(!vegLabel)
  }

  const basicDetails = () => (
    <div>
      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-4 justify-end mb-6">
        <SearchBar
          textFieldValue={textFieldValue}
          value={textFieldValue}
          setTextFieldValue={setTextFieldValue}
          // onChange={setTextFieldValue}
          placeholder="Search Menu" />

        <Link to="/">
          <button className="bg-emerald-200 hover:bg-emerald-400 hover:shadow-2xl p-2 w-28 rounded-md capitalize transition-all duration-300 ease-in-out" onClick={() => navigate(-1)}>
            home
          </button>
        </Link>
        <Link to={isAuthenticated ? "/cart" : "/login"}>
          <button className="bg-purple-200 hover:bg-purple-400 hover:shadow-2xl p-2 w-28 rounded-md capitalize transition-all duration-300 ease-in-out">
            cart
          </button>
        </Link>
      </div>

      {/* Restaurant Name and Rating */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-xl text-gray-600">{restaurantInfo?.name}</div>
        <div className="flex flexwrap flex-col p-1 bg-gray-100 shadow-lg w-20">
          <p
            className={`items-center text-center flex justify-center ${Number(restaurantInfo?.avgRatingString) > 4.5
              ? "text-green-600 hover:text-green-800 cursor-pointer transition-all duration-300 ease-in-out"
              : "text-orange-600 hover:text-orange-900 cursor-pointer transition-all duration-300 ease-in-out"
              }`}
          >
            <StarIcon /> {restaurantInfo?.avgRatingString}
          </p>
          <div className="flex justify-between border-b border-gray-500"></div>
          <p className="text-xs text-gray-500 flex justify-center text-center">
            {restaurantInfo?.totalRatingsString}
          </p>
        </div>
      </div>

      {/* Restaurant Cuisines */}
      <div className="text-gray-600 text-md mb-4">{cuisines}</div>

      {/* Restaurant Location */}
      <div className="flex flex-wrap justify-start mb-2">
        <div className="text-gray-600 text-sm">
          {restaurantInfo.areaName}, {restaurantInfo.city}
        </div>
        <div className="text-gray-600 text-sm ml-2">
          {restaurantInfo.sla.lastMileTravelString}
        </div>
      </div>

      {/* Additional Information */}
      <div className="flex flex-wrap font-bold mt-3 justify-start gap-2">
        <div className="text-gray-600 text-sm">{slaString}</div>
        <div className="text-gray-600 text-sm">{costForTwoMessage}</div>
      </div>

      {/* Veg Only Checkbox */}
      {vegOnly()}

      <Stack direction="row" className="my-4" spacing={1}>
        {vegLabel && (
          <Chip
            label="Veg Only"
            onClick={handleClick}
            onDelete={vegLabel ? handleDelete : undefined}
            color={vegLabel ? "primary" : "default"}

          />
        )}
        {
          textFieldValue && (
            <Chip
              label={textFieldValue}
              // onClick={ }
              className="capitalize"
              onDelete={() => setTextFieldValue("")}
              color={textFieldValue ? "primary" : "default"}
            />
          )
        }

      </Stack>
    </div>
  );

  const BreadCrumbsFunc = () => {
    function handleClick(event) {
      event.preventDefault();
      console.info('You clicked a breadcrumb.');
    }

    return (
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" className='text-sm ' key={1} to="/home">
            Home
          </Link>
          <Link
            className='text-sm'
            key={2}
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Restaurants
          </Link>
          <Typography key={3} className='text-sm' >{restaurantInfo?.name}</Typography>
        </Breadcrumbs>
      </div>
    )
  }

  return (
    <div className={`w-4/5 mx-auto mt-1 `}>
      {BreadCrumbsFunc()}
      {basicDetails()}
      {results()}
      <ScrollTop showBelow={500} />
    </div>
  );
};

export default HotelPageIndi;
