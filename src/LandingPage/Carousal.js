import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { API2 } from "../utils/constant";
import { corousalImageId } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { useQuery } from 'react-query';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Corousal.css"; // Import your custom styles for the carousel

const Corousal = () => {
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API2);
        setItemName(
          response?.data?.data?.cards[0]?.card?.card?.gridElements
            ?.infoWithStyle.info
        );
        localStorage.setItem(
          "carousel-items",
          JSON.stringify(
            response?.data?.data?.cards[0]?.card?.card?.gridElements
              ?.infoWithStyle.info
          )
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    let storage = localStorage.getItem("carousel-items");
    if (!storage) {
      fetchCarouselItems();
    } else {
      setItemName(JSON.parse(storage));
    }
  }, []);

  const handleItemFilter = (url) => {
    const collectionIdMatch = url.match(/\/collections\/(\d+)/);
    const collectionId = collectionIdMatch ? collectionIdMatch[1] : null;
    const tagsMatch = url.match(/&tags=([^&]+)/);
    const tags = tagsMatch ? tagsMatch[1] : null;
    navigate(
      `/collections/${collectionId}?collection_id=${collectionId}&tags=${tags}&type=rcv2`
    );
  };

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8, // Show 6 images in each slide
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    draggable: true,
    focusOnSelect: true,
    pauseOnFocus: true,
    swipeToSlide: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8, // Adjust for smaller screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4, // Adjust for smaller screens
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 4, // Adjust for smaller screens
        },
      },
    ],
  };

  const showCarousel = () => {
    return (
      <Slider {...settings}>
        {itemName &&
          itemName.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemFilter(item.action.link)}
            >
              <img
                src={`${corousalImageId}${item.imageId}`}
                alt={item.name}
                className="carousel-item"
              />
            </div>
          ))}
      </Slider>
    );
  };

  return (
    <div className="mt-2">
      <h3 className="ml-14 p-2 font-semibold text-2xl">What's on your mind?</h3>
      <div className="mb-4 mt-6 carousel-container">
        {loading ? <div>Loading...</div> : showCarousel()}
      </div>
    </div>
  );
};

// Custom navigation button component for previous slide
const CustomPrevArrow = (props) => {
  const { className, onClick } = props;

  // Handle click event for navigating to the previous slide
  const handleClick = () => {
    onClick(); // Invoke the onClick function provided by react-slick
  };

  return (
    <div
      className={className + " custom-prev-arrow"}
      onClick={handleClick}
      style={arrowStyle}
    >
      <ArrowBackIcon style={iconStyle} />
    </div>
  );
};

// Custom navigation button component for next slide
const CustomNextArrow = (props) => {
  const { className, onClick } = props;

  // Handle click event for navigating to the next slide
  const handleClick = () => {
    onClick(); // Invoke the onClick function provided by react-slick
  };

  return (
    <div
      className={className + " custom-next-arrow"}
      onClick={handleClick}
      style={arrowStyle}
    >
      <ArrowForwardIcon style={iconStyle} />
    </div>
  );
};
const arrowStyle = {
  position: "absolute",
  top: "-10%",
  transform: "translate(-50%)",
  zIndex: 1000,
  cursor: "pointer",
  fontSize: "2rem", // Increase icon size
  color: "purple",
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  "&:focus": {
    outline: "none",
  },
};

const iconStyle = {
  fontSize: "inherit", // Inherit size from parent div
};

export default Corousal;
