import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="flex flex-col justify-between border border-black md:flex md:flex-row py-10 text-white bg-black">
      <div className="flex flex-1 justify-around ">
        <div className="leftFooter1">
          <span className="opacity-50 font-medium">COMPANY</span>
          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/">Careers</Link>
            </li>
            <li>
              <Link to="/generate-password">Team GeneratePassword</Link>
            </li>
            <li>
              <Link to="/generate-password2">Generate Password2</Link>
            </li>
            <li>
              <Link to="/">Bug Bounty</Link>
            </li>
            <li>
              <Link to="/">Namaste One</Link>
            </li>
            <li>
              <Link to="/">Namaste Corporate</Link>
            </li>
            <li>
              <Link to="/grocery">Namaste Instamart</Link>
            </li>
            <li>
              <Link to="/">Namaste Genie</Link>
            </li>
          </ul>
        </div>
        <div className="leftFooter2">
          <span className="opacity-50 font-medium">CONTACT</span>
          <ul className="mt-4 flex flex-col gap-2">
            <li className="">
              <Link to="/contact">Contact Us
              </Link>
            </li>
            <li className="">
              <Link to="/progress">Progress
              </Link>
            </li>
            <li className="">
              <Link to="/barcode">Barcode with us
              </Link>
            </li>
            <li className="">  <Link to="/">Ride with us
            </Link></li>
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

            className="h-12 w-36 cursor-pointer"
            alt="apple-store-link"
            loading='lazy'
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
          />
          <img
            className="h-12 w-36 cursor-pointer"
            alt="google-play-link"
            loading='lazy'
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
          />
        </div>
      </div>
    </div>
  );
};
export default Footer;



