import LandingHeader from "./LandingHeader"
import LandingJumbo from "./LandingJumbo"
import { Link } from 'react-router-dom'
import Card from "./Card";
import Footer from "../Components/Footer";

const LandingPage = () => {
    return (
        <>
            <div className="landing-div">
                <div className="mx-10 my-10">
                    <LandingHeader />
                    <LandingJumbo />
                </div>
                <div>
                    <img src="http://localhost:3001/static/media/swiggy2.7a07461eff9b39782538.jpg" alt='food-icon' className="food-image" />
                </div>
            </div>
            <div className="landing-instruc">
                <Card
                    src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf"
                    h2="No Minimum Order"
                    para1="Order in for yourself or for the group,"
                    para2=" with no restrictions on order value"
                />
                <Card
                    src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy"
                    h2="Live Order Tracking"
                    para1="Know where your order is at all times,"
                    para2=" from the restaurant to your doorstep"
                />
                <Card
                    src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn"
                    h2="Lightning-Fast Delivery"
                    para1="Experience Swiggy's superfast delivery"
                    para2="for food delivered fresh & on time"
                />
            </div>
            <div className="mobile-content">
                <div className="font-semibold items-center p-12">
                    <h1 className="text-3xl">Restaurants in your pocket</h1>
                    <p className="text-xl mb-8">Order from your favourite restaurant on the go!!</p>
                    <div className="flex gap-2 h-10">
                        <img src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv' alt='iphone-icon' />
                        <img src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl' alt='google-icon' />
                    </div>
                </div>
                <div className="mobile-photos">
                    <img className='photo-1' src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/pixel_wbdy4n' alt='mobile-icon' />
                    <img className='photo-2' src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/iPhone_wgconp_j0d1fn' alt='mobile-icon' />
                </div>


            </div>
            <div className="">
                <Footer />
            </div>
        </>

    )

}
export default LandingPage