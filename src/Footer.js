import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // <div className="p-4 px-6 w-full overflow-hidden absolute left-0 bottom-0 flex justify-end bg-emerald-200">
    <div className="p-4 px-6 w-full flex justify-end bg-emerald-200">
      <p className="">copyright@ SagarFoodsLimited</p>
      <div className="nav">
        <ul className="flex ml-6 gap-6">
          <li>
            <Link className="link-text" to="/Adress">
              Franchise Locations
            </Link>
          </li>
          <li>
            <Link className="link-text" to="/partners">
              Franchise Partners
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
