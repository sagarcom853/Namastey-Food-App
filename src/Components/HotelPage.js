import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import RestaurantCard from "./RestaurantCard";
import { withPromotedRestuarant } from "./RestaurantCard";
import useOnlineStatus from "../useHooks/useOnLineStatus";
import ErrorModal from "./Modal/ErrorModal";
import ShimmerUi from "../useHooks/ShimmerUi";
import { useSelector } from "react-redux";

const Hotelpage = ({ RestaurantData, topRated, setTopRated, collectionId, textExplore }) => {
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
    <div className="mx-12">
      <h1 className="hotelpage-head">{!collectionId ? 'Top Rated Restaurants near you! ' : textExplore}</h1>
      <div className={`hotelpage-container ${darkMode ? 'darkModeCSS' : ''}`}>
        {RestaurantData &&
          RestaurantData?.map((data, index) => {
            return (
              <div key={index}>
                <div>{callData(data)}</div>
              </div>
            );
          })}
      </div>
    </div>

  );
};

export default Hotelpage;
