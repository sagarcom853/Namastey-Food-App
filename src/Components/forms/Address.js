import React, { useEffect, useState } from "react";
import { State } from "../../utils/constant";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./forms.css"
import axios from "axios";

const Address = () => {
    const [countries, setCountries] = useState([]);
    const [allStates] = useState(State);
    const { setAuth, auth, user, login } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        add1: user.add1 || '',
        add2: user.add2 || '',
        landmark: user.landmark || '',
        pin: user.pin || '',
        state: user.state || '',
        country: user.country || '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        let email = user.email

        try {
            const response = await axios.post(
                "http://localhost:8000/user/addAddress",
                {
                    email,
                    formData,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('response fro ba kend', response)

            if (response.status === 200) {
                // Uncomment the following lines if needed
                login(response.data.user);
                navigate('/profile');
                console.log("User updated successfully!", response);
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server responded with an error:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from the server.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request:", error.message);
            }
        }
    };


    // Fetch countries data when component mounts
    useEffect(() => {
        // Replace 'https://restcountries.com/v3.1/all' with a real API endpoint for countries
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    return (
        <div className="form-section w-[400px] bg-[#ddd] p-4 mx-auto my-6">
            <p className="form-heading">Add Address</p>
            <div className="form-fields">
                <div className="form-field">
                    <label htmlFor="add1">Address Line 1</label>
                    <input
                        type="text"
                        placeholder="Enter address Line 1"
                        id="add1"
                        value={formData.add1}
                        name="add1"
                        className="input-field"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="add2">Address Line 2</label>
                    <input
                        type="text"
                        placeholder="Enter address Line 2"
                        id="add2"
                        value={formData.add2}
                        name="add2"
                        className="input-field"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="landmark">Landmark</label>
                    <input
                        type="text"
                        placeholder="Enter Nearby Landmark"
                        id="landmark"
                        value={formData.landmark}
                        name="landmark"
                        className="input-field"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="pin">PINCODE</label>
                    <input
                        type="text"
                        placeholder="Enter Postal Code"
                        id="pin"
                        value={formData.pin}
                        name="pin"
                        className="input-field"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="country">Country</label>
                    <select
                        id="country"
                        value={formData.country}
                        name="country"
                        onChange={(e) => handleChange(e)}
                        className="input-field"
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.alpha3Code} value={country.alpha3Code}>
                                {country.name.common}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="state">State</label>
                    <select
                        id="state"
                        value={formData.state}
                        name="state"
                        onChange={(e) => handleChange(e)}
                        className="input-field"
                    >
                        <option value="">Select State</option>
                        {allStates.map((state) => (
                            <option key={state.id} value={state.id}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="btn-container py-3">
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Address;
