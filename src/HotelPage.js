import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import RestaurantCard from "./RestaurantCard";
import { withPromotedRestuarant } from "./RestaurantCard";
import useOnlineStatus from "./useHooks/useOnLineStatus";
import ErrorModal from "./ErrorModal";
import ShimmerUi from "./useHooks/ShimmerUi";
import { useSelector } from "react-redux";

const Hotelpage = ({ RestaurantData, topRated, setTopRated }) => {
  const onlineStatus = useOnlineStatus();
  const RestaurantCardPromoted = withPromotedRestuarant(RestaurantCard);

  const darkMode = useSelector((store) => store.cart?.dark)
  useEffect(() => {
    if (!onlineStatus) {
      return (
        <div>
          <ErrorModal display={!onlineStatus} />
          {/* <ShimmerUi /> */}
        </div>
      );
    }
  }, [onlineStatus])


  const callData = (data) => {
    if (data.info.promoted === true) {
      return (
        <RestaurantCardPromoted
          data={data}
          topRated={topRated}
          setTopRated={setTopRated}
        />
      );
    } else {
      return (
        <RestaurantCard
          data={data}
          topRated={topRated}
          setTopRated={setTopRated}
        />
      );
    }
  };

  if (!RestaurantData) {
    return <ShimmerUi />;
  }
  return (
    <>

      <div className={`w-11/12 mx-auto flex flex-row flex-wrap gap-5 mb-4 sm:justify-center sm:items-center  md:justify-start ${darkMode ? 'darkModeCSS' : ''}`}>
        {RestaurantData &&
          RestaurantData?.map((data, index) => {
            return (
              <div key={index}>
                <p>{callData(data)}</p>
              </div>
            );
          })}
      </div>
    </>

  );
};

export default Hotelpage;
