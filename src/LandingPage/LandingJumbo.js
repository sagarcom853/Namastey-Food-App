import { useEffect, useState } from "react";
import axios from 'axios'
import { weather_API } from "../utils/constant";
import { Link } from 'react-router-dom'
import Card from "./Card";
import Footer from "../Components/Footer";

const LandingJumbo = () => {
    const [long, setLong] = useState('');
    const [lat, setLat] = useState('');
    const [cityData, setCityData] = useState();
    const [locationchange, setLocationChange] = useState(false);
    let cities = ["Delhi", "Mumbai", "Gurgaon", "Chennai", "Hyderabad", "Pune", "Bangalore", "Ahmadabad", "& more"]

    const detectLocation = () => {
        navigator.geolocation.watchPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
            setLocationChange(true)
        });
    };

    async function getCity() {
        console.log('i side get city')
        try {
            if (lat && long) {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_API}`);
                console.log(response)
                setCityData(response.data);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    useEffect(() => {
        getCity();
    }, [locationchange]);


    const getCities = () => {
        return cities.map((city, index) => {
            return (
                <Link to='' key={index}>{city}</Link>
            )
        })
    }
    return (
        <>
            <div className="w-full text-center font-bold mt-20">
                <h1 className="text-4xl mb-4"> Hungry?</h1>
                <p className="text-3xl text-gray-500 mb-4">Order food from favourite restaurants near you.</p>
                <div className="landing-input">
                    <input
                        type="text"
                        placeholder="Delivery Location"
                        name="name"
                        id="name"
                        value={cityData && cityData.name}
                    />
                    <button onClick={detectLocation}>Locate Me</button>
                </div>
                <div className="mt-20">
                    <p className="uppercase text-gray-500">popular cities in India</p>
                    <div className="city-names">
                        {getCities()}
                    </div>
                </div>

            </div>
           
        </>

    )
}
export default LandingJumbo
