import React, { useCallback, useEffect, useState } from "react";
import HotelPage from "./HotelPage";
import FiltersPage from "./FiltersPage";
// import TotalRestaurants from "./TotalRestaurants";
import ShimmerUi from "./useHooks/ShimmerUi";
import { useAuth } from "./Context/AuthProvider";
import { useLocation } from "react-router-dom";
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from "react-redux";
import { themeReducer } from "./Redux/cartSlice";
import Modal from "./Modal/Modal";
import { IntlProvider } from "react-intl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'

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
  const [labelNamesArray, setLabelNamesArray] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [Err, setErr] = useState("")
  const [loading, setLoading] = useState(false)
  const [filteredRestaurants , setFilteredRestaurants] = useState([])
  const [allRestaurants,setAllRestaurants] = useState([])

  const [page,setPage] = useState(10)
  const { isAuthenticated } = useAuth()
  const dispatch = useDispatch()
  const location = useLocation()
  console.log('location', location)

  const darkMode = useSelector((store) => store?.cart.dark);
  console.log("themeColor", darkMode)
  let API =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"

  let API2 = 'https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING'


  const handleTopRestaurants = () => {
    setTopRated(!topRated);
  };

  const fetchData = async () => {
    try {
      const data = await fetch(API2);
      const json = await data.json();
      setRestaurantData6(
        json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setOriginalData(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants)
    } catch (error) {
      <Modal
        modalContent={error}
        modalTitle="Error Occured"
        showModal={showModal}
        setShowModal={setShowModal} />
    }
  };
  const fetchMoreData = async () => {
    console.log("fetch more datta called")
    try {
      setLoading(true);
      const data = await fetch(API2);
      const json = await data.json();
      setRestaurantData6(prevData => [
        ...prevData,
        ...(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
      ]);
      setOriginalData(prevData => [
        ...prevData,
        ...(json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
      ]);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  const throttledFetchMoreData = _.throttle(fetchMoreData, 5000)

  //get more restaurants new new
  async function getRestaurantMore() {
    setLoading(true);
    try {
      const response = await fetch(
        'https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update',
        {
          method: 'POST', // Use POST for fetching more restaurants
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers here
          },
          body: JSON.stringify({
            lat: 12.9715987,
            lng: 77.5945627,
            nextOffset: 'COVCELQ4KID4ruup+9+KczCnEzgD', // Use the correct nextOffset value
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
              collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: String(page),
            },
          }),
        }
      );
      const data = await response.json();
      //    console.log(data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants);
      if (allRestaurants) {

        let newRestaurants = data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants;

        setFilteredRestaurants((prevRestaurants) => [...prevRestaurants, ...newRestaurants]);
        setAllRestaurants((prevRestaurants) => [...prevRestaurants, ...newRestaurants]);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  }

  const setTopRatedFunc = useCallback(() => {
    if (topRated) {
      if (RestaurantData6?.length > 0) {
        let RestaurantData4 = originalData.filter(
          (data) => data.info.avgRating > 4.3
        );
        console.log(originalData)
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
        let filteredData = originalData.filter((data) => {
          if (data.info.name.toLowerCase().includes(textFieldValue.toLowerCase())) {
            setErr("")
            return data.info.name.toLowerCase().includes(textFieldValue.toLowerCase())
          } else {
            setErr("No restaurants found")
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
    } else {
      setRestaurantData6(originalData)
    }
  }

  const setDropDown = () => {
    let labelNamesArray = RestaurantData6?.map((res) => {
      return res.info.name
    })
    labelNamesArray?.unshift("No items Selected")
    labelNamesArray = labelNamesArray.filter((lab, index) => {
      return labelNamesArray.indexOf(lab) === index
    })
    setLabelNamesArray(labelNamesArray)
  }
  const handleInputChange = (e) => {
    if (e.target.value.toLowerCase() === "no items selected") {
      setRestaurantData6(originalData)
    }
    else if (e.target.value) {
      let filteredDropRes = originalData.filter((res) => {
        return res.info.name === e.target.value
      })
      setRestaurantData6(filteredDropRes)
    }
  }

  const setDrawFilter = () => {
    if (priceFilter) {
      const filteredData = originalData.filter((data) => {
        const priceString = data.info.price; // Assuming "₹150 for two" format
        const priceValue = Number(priceString?.replace(/[^0-9]/g, '')); // Extract the numerical part
        return priceValue > priceFilter;
      });
      console.log('filteredData', filteredData);
      return filteredData;
    } else {
      return originalData;
    }
  };

  const showToastMessage = () => {
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  useEffect(() => {
    fetchData();
  }, [])

  //  useEffect(() => {
  //   toast.promise(fetchData, {
  //     pending: "Promise is pending",
  //     success: "Promise Loaded",
  //     error: "error"
  //   });
  // }, []);
  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 &&
        !loading

      ) {
        console.log('window.innerHeight', window.innerHeight, 'document', document.documentElement.offsetHeight)
        throttledFetchMoreData();   // if throttled then use this function, otherwise can directly use fetchMoreData()
      }
    };
    window.addEventListener("scroll", handleScroll);


    return () => {
      console.log("cleaned up")
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);


  useEffect(() => {
    SearchFilter()
  },
    [textFieldValue]);

  useEffect(() => {
    setTopRatedFunc()
  }, [topRated])

  useEffect(() => {
    setDropDown()
  }, [originalData])

  useEffect(() => {
    setDrawFilter()
  }, [priceFilter])

  if (RestaurantData6?.length === 0) {
    <Modal
      modalContent={"Loading....................."}
      modalTitle="Error Occured"
      showModal={showModal}
      setShowModal={setShowModal} />
    return <ShimmerUi />;
  }

  const handleTheme = () => {
    console.log("dark inside handleTheme", darkMode)
    if (darkMode) {
      dispatch(themeReducer("light"))
    } else {
      dispatch(themeReducer("dark"))
    }
  }

  return (
    <div className={` ${darkMode ? 'darkModeCSS' : ""}`}>
      {isAuthenticated ? <div className="flex items-center justify-center flex-wrap font-bold text-lg my-6">{location.state ? `Welcome back ${location.state.name}` : ""}</div> : " "}

      <button onClick={showToastMessage}>Notify</button>
      <ToastContainer />
      <div className={`flex flex-row flex-wrap justify-between`}>
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
          Err={Err}
        />
        <div className="flex flex-wrap justify-end m-4 p-2">
          <div className="flex gap-12 cursor-pointer text-xs">

            <div className="flex gap-4 items-center">
              <Switch
                checked={darkMode}
                onChange={handleTheme}
                inputProps={{ 'aria-label': 'controlled' }}
                label={darkMode === true ? "Dark" : "Ligt"}
              />
            </div>

            <div className="flex gap-4 items-center">
              <img className="h-6" alt="illustration" src="https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png?output-format=webp" loading="lazy" />
              <span className="">Delivery</span>
            </div>
            <div className="flex gap-4 items-center">
              <img className="h-6" alt="illustration" src="https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png?output-format=webp" loading="lazy" />
              <span className="whitespace-nowrap">Dining Out</span>
            </div>
            <div className="flex gap-4 items-center">
              <img className="h-6" alt="illustration" src="https://b.zmtcdn.com/data/o2_assets/01040767e4943c398e38e3592bb1ba8a1616150142.png?output-format=webp" loading="lazy" />
              <span className="">Nightlife</span>
            </div>
          </div>
        </div>
      </div>

      {/* <TotalRestaurants RestaurantData={RestaurantData6} /> */}

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
    </div>
  );
};
export default Home;



