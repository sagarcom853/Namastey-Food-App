import React, { useState } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";


const ScrollTop = ({ showBelow }) => {
  const [show, setShow] = useState(showBelow);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", handleScroll);

  return (
    <Fab
      color="primary"
      aria-label="scroll back to top"
      onClick={handleClick}
      style={{
        display: show ? "flex" : "none",
        position: "fixed",
        bottom: "16px",
        right: "16px",
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollTop


