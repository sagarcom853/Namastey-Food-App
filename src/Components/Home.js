import React, { useCallback, useEffect, useState } from "react";
import HotelPage from "./HotelPage";
import FiltersPage from "./Filters/FiltersPage";
import ShimmerUi from "../useHooks/ShimmerUi";
import { useAuth } from "./Context/AuthProvider";
import { useLocation } from "react-router-dom";
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from "react-redux";
import { themeReducer, setCartItems } from "./Redux/cartSlice";
import Modal from "./Modal/Modal";
import ScrollTop from "../utils/ScrollToTop";
import axios from 'axios'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { API2 } from "../utils/constant";
import { weather_API } from "../utils/constant";

const Home = ({
  marks,
  handleChange,
  valuetext,
  priceFilter,
  handleBlur,
  value,
  HighestPriceValue,
  handleSearchChange,
}) => {
  let [RestaurantData6, setRestaurantData6] = useState([]);
  // const [selectedOption, setSelectedOption] = useState(null);
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const [topRated, setTopRated] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [dropdownValue, setDropDownValue] = useState('')
  const [labelNamesArray, setLabelNamesArray] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [Err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const [cityData, setCityData] = useState('')
  const [page, setPage] = useState(10)
  const { isAuthenticated, user } = useAuth()
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const dispatch = useDispatch()
  const location = useLocation()

  const darkMode = useSelector((store) => store?.cart.dark);

  const handleTopRestaurants = () => {
    setTopRated(!topRated);
  };

  const fetchData = async () => {
    try {
      const data = await fetch(API2);
      const json = await data.json();

      setRestaurantData6(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setOriginalData(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants)

    } catch (error) {
      <Modal
        modalContent={error}
        modalTitle="Error Occured"
        showModal={showModal}
        setShowModal={setShowModal} />
    }
  };

  const detectLocation = () => {
    navigator.geolocation.watchPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };

  useEffect(() => {
    detectLocation()
  }, [])

  //function to implement infinite scrolling but with same API... 
  // const getRestaurantMore = async () => {
  //   console.log("fetch more datta called")
  //   try {
  //     setLoading(true);
  //     const data = await fetch(API2);
  //     const json = await data.json();
  //     setRestaurantData6(prevData => [
  //       ...prevData,
  //       ...(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
  //     ]);
  //     setOriginalData(prevData => [
  //       ...prevData,
  //       ...(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
  //     ]);
  //   } catch (error) {
  //     console.error("Error fetching more data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  //function to get more restaurants and implement infinite scrolling with new Restaurants...
  async function getRestaurantMore() {
    setLoading(true);
    try {
      const response = await fetch(
        'https://www.swiggy.com/dapi/restaurants/list/update',
        {
          method: 'POST', // Use POST for fetching more restaurants
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers here
          },
          body: JSON.stringify({
            lat: 12.9715987,
            lng: 86.73296984285116,
            nextOffset: 'COVCELQ4KICAkcKjpOn/ZDCnEzgC', // Use the correct nextOffset value,
            page_type: "DESKTOP_WEB_LISTING",
            // Other payload parameters if needed
            seoParams: {
              apiName: "FoodHomePage",
              pageType: "FOOD_HOMEPAGE",
              seoUrl: "https://www.swiggy.com/",
            },
            widgetOffset: {
              // Include your widgetOffset values here
              NewListingView_Topical_Fullbleed: '',
              NewListingView_category_bar_chicletranking_TwoRows: '',
              NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
              Restaurant_Group_WebView_SEO_PB_Theme: '',
              collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "10",
              inlineFacetFilter: '',
              restaurantCountWidget: '',
              // collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: String(page),
            },
          }),
        }
      );
      const data = await response.json();
      if (originalData) {
        let newRestaurants = data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants;
        setRestaurantData6((prevRestaurants) => [...prevRestaurants, ...newRestaurants]);
        setOriginalData((prevRestaurants) => [...prevRestaurants, ...newRestaurants]);
      }
    } catch (error) {
      setErr("Not able to update the additional Restaurants...")
    } finally {
      setLoading(false);
    }
  }

  const throttle = (func, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  };
  // const throttledGetRestaurantMore = throttle(getRestaurantMore, 5000);
  const throttledGetRestaurantMore = useCallback(throttle(getRestaurantMore, 5000), []);

  const setTopRatedFunc = useCallback(() => {
    if (topRated) {
      if (RestaurantData6?.length > 0) {
        let RestaurantData4 = originalData?.filter(
          (data) => data.info.avgRating > 4.3
        );
        if (originalData.length !== RestaurantData4.length) {
          setRestaurantData6(RestaurantData4)
        }
      }
    } else {
      setRestaurantData6(originalData)
    }

  }, [topRated])

  const SearchFilter = async () => {
    if (textFieldValue) {
      if (originalData && originalData.length > 0) {
        let filteredData = originalData?.filter((data) => {
          if (data.info.name.toLowerCase().includes(textFieldValue.toLowerCase())) {
            setErr("")
            return data.info.name.toLowerCase().includes(textFieldValue.toLowerCase())
          } else {
            setErr("No restaurants found")
            // setRestaurantData6('')
            return;
          }
        })
        if (filteredData.length > 0) {
          setRestaurantData6(filteredData)
          setErr("")
        } else {
          setErr("No restaurants found")
          return;
        }

      }

    }
    else if (topRated) {
      setTopRatedFunc()
    }
    // else if(dropdownValue.length>0){
    //   handleInputChange
    // }
    else {
      setRestaurantData6(originalData)
    }
  }

  const setDropDown = () => {
    let labelNamesArray = RestaurantData6?.map((res) => {
      return res.info.name
    })
    labelNamesArray?.unshift("No items Selected")
    labelNamesArray = labelNamesArray?.filter((lab, index) => {
      return labelNamesArray.indexOf(lab) === index
    })
    setLabelNamesArray(labelNamesArray)
  }

  const handleInputChange = (e) => {
    if (e.target.value.toLowerCase() === "no items selected") {
      setRestaurantData6(originalData)
      setDropDownValue('')
    }
    else if (e.target.value) {
      let filteredDropRes = originalData?.filter((res) => {
        return res.info.name === e.target.value
      })
      // setTextFieldValue('')
      setRestaurantData6(filteredDropRes)
      setDropDownValue(filteredDropRes)

    }
  }

  const setDrawFilter = () => {
    if (priceFilter) {
      const filteredData = originalData?.filter((data) => {
        const priceString = data.info.price; // Assuming "₹150 for two" format
        const priceValue = Number(priceString?.replace(/[^0-9]/g, '')); // Extract the numerical part
        return priceValue > priceFilter;
      });
      return filteredData;
    } else {
      return originalData;
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0)
  }, [])

  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight

      ) {
        setPage((prev) => prev + 15)
        throttledGetRestaurantMore()
        // throttledFetchMoreData();   // if throttled then use this function, otherwise can directly use fetchMoreData()
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, throttledGetRestaurantMore]);

  useEffect(() => {
    if (user && user.email) {
      const storedCart = localStorage.getItem(`cart-${user?.email}`);
      if (storedCart) {
        console.log('storedCart', JSON.parse(storedCart))
        dispatch(setCartItems(JSON.parse(storedCart)));
      }
    }

  }, [user, dispatch]);
  useEffect(() => {
    SearchFilter()
    if (textFieldValue === '') {
      setErr('')
    }
  },
    [textFieldValue, Err]);

  useEffect(() => {
    setTopRatedFunc()
  }, [topRated])

  useEffect(() => {
    setDropDown()
  }, [originalData])

  useEffect(() => {
    setDrawFilter()
  }, [priceFilter])

  useEffect(() => {
    getCity();
  }, [lat, long]);


  if (RestaurantData6?.length === 0) {
    return (
      <>
        <Modal
          modalContent={"Loading....................."}
          modalTitle="Error Occured"
          showModal={showModal}
          setShowModal={setShowModal} />

        <ShimmerUi />

      </>
    );
  }

  const handleTheme = () => {
    if (darkMode) {
      dispatch(themeReducer("light"))
    } else {
      dispatch(themeReducer("dark"))
    }
  }

  async function getCity() {
    try {
      if (lat && long) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_API}`);
        setCityData(response.data);

      }
    } catch (error) {
      if (error.response) {
        setErr(error.response.data.message)

      }
    }
  }

  const filters = () => {
    return (
      <div >
        <Stack direction="row" className="ml-6 cursor-pointer" spacing={1}>
          {dropdownValue && (
            <Chip
              label={dropdownValue[0].info.name}
              // onDelete={() => setTopRated(false)}
              color="primary"

            />
          )}
          {topRated && (
            <Chip
              label="Top Rated"
              onDelete={() => setTopRated(false)}
              color={topRated ? "primary" : "default"}

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

    )
  }

  return (
    <div className={` ${darkMode ? 'darkModeCSS' : ""}`}>
      {isAuthenticated ? <div className="flex flex-wrap items-center justify-center font-bold text-lg">{location.state ? `Welcome back ${user.name}` : ""}</div> : " "}
      <div className="flex flex-wrap justify-start mx-8 gap-10">
        <div>You are in {cityData?.name || ''}</div>
        {Err ?
          <div className="px-10 py-1 rounded-md flex justify-center bg-red-600 text-white">{Err}</div>
          : ''
        }
      </div>

      <div className={`w-full flex flex-row sm:items-center sm:justify-center sm:mx-auto flex-wrap justify-between`}>
        <FiltersPage
          RestaurantData={RestaurantData6}
          marks={marks}
          textFieldValue={textFieldValue}
          handleChange={handleChange}
          valuetext={valuetext}
          value={value}
          handleBlur={handleBlur}
          HighestPriceValue={HighestPriceValue}
          priceFilter={priceFilter}
          labelNamesArray={labelNamesArray}
          handleInputChange={handleInputChange}
          handleSearch={handleSearchChange}
          setTextFieldValue={setTextFieldValue}
          handleTopRestaurants={handleTopRestaurants}
          topRated={topRated}
          setTopRated={setTopRated}
          dropdownValue={dropdownValue}
          Err={Err}
        />
        <div className="flex flex-wrap justify-end m-4 p-2">
          <div className="flex flex-wrap gap-12 cursor-pointer text-xs">
            <div className="flex gap-4 items-center">
              <Switch
                checked={darkMode}
                onChange={handleTheme}
                inputProps={{ 'aria-label': 'controlled' }}
                label={darkMode === true ? "Dark" : "Ligt"}
              />
            </div>
            <div className="flex gap-4 items-center">
              <img className="h-6 w-6" alt="illustration" src="https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png?output-format=webp" loading="lazy" />
              <span className="">Delivery</span>
            </div>
            <div className="flex gap-4 items-center">
              <img className="h-6 w-6" alt="illustration" src="https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png?output-format=webp" loading="lazy" />
              <span className="whitespace-nowrap">Dining Out</span>
            </div>
            <div className="flex gap-4 items-center">
              <img className="h-6 w-6" alt="illustration" src="https://b.zmtcdn.com/data/o2_assets/01040767e4943c398e38e3592bb1ba8a1616150142.png?output-format=webp" loading="lazy" />
              <span className="">Nightlife</span>
            </div>
          </div>
        </div>
      </div>
      {/* <TotalRestaurants RestaurantData={RestaurantData6} /> */}
      {filters()}
      <HotelPage
        RestaurantData={RestaurantData6}
        marks={marks}
        textFieldValue={textFieldValue}
        handleChange={handleChange}
        valuetext={valuetext}
        value={value}
        handleBlur={handleBlur}
        HighestPriceValue={HighestPriceValue}
        priceFilter={priceFilter}
        labelNamesArray={labelNamesArray}
        handleInputChange={handleInputChange}
        handleSearch={handleSearchChange}
        setTextFieldValue={setTextFieldValue}
        // handleTopRestaurants={handleTopRestaurants}
        topRated={topRated}
        setTopRated={setTopRated}
      />
      <ScrollTop showBelow={800} />
    </div>
  );
};
export default Home;

