import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import RestaurantCard from "./RestaurantCard";
import { withPromotedRestuarant } from "./RestaurantCard";
import useOnlineStatus from "./useHooks/useOnLineStatus";
import ErrorModal from "./ErrorModal";
import ShimmerUi from "./useHooks/ShimmerUi";

const Hotelpage = ({ RestaurantData, topRated, setTopRated }) => {
  const onlineStatus = useOnlineStatus();
  const RestaurantCardPromoted = withPromotedRestuarant(RestaurantCard);

  if (!onlineStatus) {
    return (
      <div>
        <ShimmerUi />
        <ErrorModal display={!onlineStatus} />
      </div>
    );
  }

  const callData = (data) => {
    if (data.data.promoted === true) {
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
      <div className='flex flex-wrap mx-4 lg:justify-start md:justify-center sm:justify-center p-2 gap-5'>
        {RestaurantData &&
          RestaurantData?.map((data, index) => {
            return (
              <div key={index}>
                <p>{callData(data)}</p>
              </div>
            );
          })}
      </div>
  );
};

export default Hotelpage;
