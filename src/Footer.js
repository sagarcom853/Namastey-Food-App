import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="flex flex-col justify-between border border-black md:flex md:flex-row py-10 text-white bg-black">
      <div className="flex flex-1 justify-around ">
        <div className="leftFooter1">
          <span className="opacity-50 font-medium">COMPANY</span>
          <ul className="mt-4 flex flex-col gap-2">
            <Link to="/about">
              <li className="">About us</li>
            </Link>
            <Link to="/">
              <li className="">Careers</li>
            </Link>
            <Link to="/generate-password">
              <li className="">Team GeneratePassword</li>
            </Link>
            <Link to="/generate-password2">
              <li className="">Generate Password2</li>
            </Link>
            <Link to="/">
              <li className="">Bug Bounty</li>
            </Link>
            <Link to="/">
              <li className="">Namaste One</li>
            </Link>
            <Link to="/">
              <li className="">Namaste Corporate</li>
            </Link>
            <Link to="/grocery">
              <li className="">Namaste Instamart</li>
            </Link>
            <Link to="/">
              <li className="">Namaste Genie</li>
            </Link>
          </ul>
        </div>
        <div className="leftFooter2">
          <span className="opacity-50 font-medium">CONTACT</span>
          <ul className="mt-4 flex flex-col gap-2">
            <Link to="/contact">
              <li className="">Contact Us</li>
            </Link>
            <Link to="/progress">
              <li className="/">Progress</li>
            </Link>
            <Link to="/barcode">
              <li className="">Barcode with us</li>
            </Link>
            <Link to="/">
              <li className="">Ride with us</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className=" flex flex-1 justify-around md:mt-0 mt-10 ">
        <div className="hidden md:block rightFooter1">
          <span className="opacity-50 font-medium">LEGAL</span>
          <ul className="mt-4 flex flex-col gap-2">
            <Link to="/">
              <li className="">Terms & Conditions</li>
            </Link>
            <Link to="/">
              <li className="">Refund & Cancellation</li>
            </Link>
            <Link to="/">
              <li className="">Privacy Policy</li>
            </Link>
            <Link to="/">
              <li className="">Cookie Policy</li>
            </Link>
            <Link to="/">
              <li className="">Offer Terms</li>
            </Link>
            <Link to="/">
              <li className="">Phishing & Fraud</li>
            </Link>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <img
            className="h-12 cursor-pointer"
            alt="apple-store-link"
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
          />
          <img
            className="h-12 cursor-pointer"
            alt="google-play-link"
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
          />
        </div>
      </div>
    </div>
  );
};
export default Footer;



