import React, { useEffect, useState } from "react";
import HotelPage from "./HotelPage";
import RestaurantData from "./restaurants.json";
import FiltersPage from "./FiltersPage";
import axios from "axios";
import TotalRestaurants from "./TotalRestaurants";
import ShimmerUi from "./useHooks/ShimmerUi";

const Home = ({
  textFieldValue,
  marks,
  handleChange,
  valuetext,
  priceFilter,
  handleBlur,
  value,
  HighestPriceValue,
  handleSearchChange,
  setTextFieldValue,
}) => {
  let [RestaurantData6, setRestaurantData6] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [topRated, setTopRated] = useState(false);

  let API =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.9319838&lng=86.7465928&page_type=DESKTOP_WEB_LISTING";

  let API2 =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.9319838&lng=86.7465928&offset=15&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING";
  // const RestaurantDataSearchFiltered = RestaurantData6.filter((data) =>
  //   data.data.name.toLowerCase().includes(textFieldValue.toLowerCase())
  // );
  // console.log("RestaurantDataSearchFiltered",RestaurantDataSearchFiltered)
  // let RestaurantData2 = RestaurantDataSearchFiltered.filter(
  //   (data) => Number(data.minimum_order_price) <= Number(priceFilter)
  // );
  // let RestaurantData2=''

  if (topRated) {
    let RestaurantData4 = RestaurantData6.filter((data) => data.data.avgRating > 4);
    RestaurantData6 = RestaurantData4;
    console.log("Res", RestaurantData6);
  }

  // if (selectedOption) {
  //   if (selectedOption.toLowerCase().toString() === "no options selected") {
  //     RestaurantData2 = [...RestaurantData2];
  //   } else {
  //     RestaurantData2 = RestaurantData2.filter(
  //       (data) => data.data.name === selectedOption
  //     );
  //   }
  // }
  // const labelNamesArray = [];
  // labelNamesArray.push({ label: "No Options Selected" });
  // RestaurantData2.filter((data) => labelNamesArray.push({ label: data.name }));
  // const handleInputChange = (event, value) => {
  //   setSelectedOption(value.label);
  // };
  const handleTopRestaurants = () => {
    setTopRated(!topRated);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(API); // Replace with your API endpoint
      const response2 = await axios.get(API2);

      console.log('response',response) 
      console.log('response2',response2) 
      // response2?.data?.data?.cards.forEach((datum)=>{
      //     if(response?.data?.data?.cards[2]?.data?.data?.cards.data.name.includes(datum.data.data.name)){
      //       console.log('1')
      //       console.log('datum',datum.data.data.name)
      //     }
      // })

      response.data.data.cards.map((d) => {
        if (d.cardType === "seeAllRestaurants") {
          console.log('Restaurant6',RestaurantData6)
          setRestaurantData6(d.data.data.cards);
        }
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (RestaurantData6.length === 0 ) {
    return <ShimmerUi />;
  }

  return (
    <div>
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
        // labelNamesArray={labelNamesArray}
        // handleInputChange={handleInputChange}
        handleSearch={handleSearchChange}
        setTextFieldValue={setTextFieldValue}
        handleTopRestaurants={handleTopRestaurants}
        topRated={topRated}
        setTopRated={setTopRated}
      />
      <TotalRestaurants RestaurantData={RestaurantData6} />

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
        // labelNamesArray={labelNamesArray}
        // handleInputChange={handleInputChange}
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
