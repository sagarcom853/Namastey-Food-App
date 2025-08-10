import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import RestaurantCard from "./RestaurantCard";
import { withPromotedRestuarant } from "./RestaurantCard";
import useOnlineStatus from "../useHooks/useOnLineStatus";
import ErrorModal from "./Modal/ErrorModal";
import ShimmerUi from "../useHooks/ShimmerUi";
import { useSelector } from "react-redux";
import ChatAssistant from "./Chat/ChatAssistant";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material";

const Hotelpage = ({ RestaurantData, topRated, setTopRated, collectionId, textExplore }) => {
  const [showAssistant, setShowAssistant] = useState(false);
  const handleOpenAI = () => setShowAssistant(true);
  const handleCloseAI = () => setShowAssistant(false);

  const onlineStatus = useOnlineStatus();
  const RestaurantCardPromoted = withPromotedRestuarant(RestaurantCard);

  const darkMode = useSelector((store) => store.cart?.dark);
  useEffect(() => {
    if (!onlineStatus) {
      return (
        <div>
          <ErrorModal display={!onlineStatus} />
          {/* <ShimmerUi /> */}
        </div>
      );
    }
  }, [onlineStatus]);

  const callData = (data) => {
    if (data.info.promoted === true) {
      return <RestaurantCardPromoted data={data} topRated={topRated} setTopRated={setTopRated} />;
    } else {
      return <RestaurantCard data={data} topRated={topRated} setTopRated={setTopRated} />;
    }
  };

  if (!RestaurantData) {
    return <ShimmerUi />;
  }
  return (
    <div className='mx-12' style={{ position: "relative" }}>
      <div className='flex justify-end mr-12'>
        <button type='button' className='button' variant='contained' onClick={handleOpenAI}>
          Open AI
        </button>
      </div>

      {showAssistant && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            width: "350px",
            height: "50vh",
            background: "#fff",
            boxShadow: "-2px 0 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button style={{ alignSelf: "flex-end", margin: "8px" }} onClick={handleCloseAI}>
            <Tooltip title='Close Chat Assistant'>
              <ClearIcon />
            </Tooltip>
          </button>
          <ChatAssistant />
        </div>
      )}

      <h1 className='hotelpage-head'>{!collectionId ? "Top Rated Restaurants near you! " : textExplore}</h1>
      <div className={`hotelpage-container ${darkMode ? "darkModeCSS" : ""}`}>
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
