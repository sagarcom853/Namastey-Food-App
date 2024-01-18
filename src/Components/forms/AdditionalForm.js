// AdditionalFormPage.js

import React, { useEffect, useState } from "react";

const AdditionalFormPage = ({ formData, handleChange }) => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [allStates] = useState(
        [
            {
                "slno": 0,
                "abb": "AN",
                "name": "Andaman and Nicobar Islands",
                "state": "andaman-and-nicobar"
            },
            {
                "slno": 1,
                "abb": "AP",
                "name": "Andhra Pradesh",
                "state": "andhra-pradesh"
            },
            {
                "slno": 2,
                "abb": "AR",
                "name": "Arunachal Pradesh",
                "state": "arunachal-pradesh"
            },
            {
                "slno": 3,
                "abb": "AS",
                "name": "Assam",
                "state": "assam"
            },
            {
                "slno": 4,
                "abb": "BR",
                "name": "Bihar",
                "state": "bihar"
            },
            {
                "slno": 5,
                "abb": "CG",
                "name": "Chandigarh",
                "state": "chandigarh"
            },
            {
                "slno": 6,
                "abb": "CH",
                "name": "Chhattisgarh",
                "state": "chattishgarh"
            },
            {
                "slno": 7,
                "abb": "DH",
                "name": "Dadra and Nagar Haveli",
                "state": "dadra-and-nagar"
            },
            {
                "slno": 8,
                "abb": "DD",
                "name": "Daman and Diu",
                "state": "daman-and-diu"
            },
            {
                "slno": 9,
                "abb": "DL",
                "name": "Delhi",
                "state": "delhi"
            },
            {
                "slno": 10,
                "abb": "GA",
                "name": "Goa",
                "state": "goa"
            },
            {
                "slno": 11,
                "abb": "GJ",
                "name": "Gujarat",
                "state": "gujrat"
            },
            {
                "slno": 12,
                "abb": "HR",
                "name": "Haryana",
                "state": "haryana"
            },
            {
                "slno": 13,
                "abb": "HP",
                "name": "Himachal Pradesh",
                "state": "himachal-pradesh"
            },
            {
                "slno": 14,
                "abb": "JK",
                "name": "Jammu and Kashmir",
                "state": "jammu-and-kashmir"
            },
            {
                "slno": 15,
                "abb": "JH",
                "name": "Jharkhand",
                "state": "jharkhand"
            },
            {
                "slno": 16,
                "abb": "KA",
                "name": "Karnataka",
                "state": "karnataka"
            },
            {
                "slno": 17,
                "abb": "KL",
                "name": "Kerala",
                "state": "kerala"
            },
            {
                "slno": 18,
                "abb": "LD",
                "name": "Lakshadweep",
                "state": "lakshadweep"
            },
            {
                "slno": 19,
                "abb": "MP",
                "name": "Madhya Pradesh",
                "state": "madhya-pradesh"
            },
            {
                "slno": 20,
                "abb": "MH",
                "name": "Maharashtra",
                "state": "maharashtra"
            },
            {
                "slno": 21,
                "abb": "MN",
                "name": "Manipur",
                "state": "manipur"
            },
            {
                "slno": 22,
                "abb": "ML",
                "name": "Meghalaya",
                "state": "meghalaya"
            },
            {
                "slno": 23,
                "abb": "MZ",
                "name": "Mizoram",
                "state": "mizoram"
            },
            {
                "slno": 24,
                "abb": "NL",
                "name": "Nagaland",
                "state": "nagaland"
            },
            {
                "slno": 25,
                "abb": "OR",
                "name": "Odisha",
                "state": "odhisha"
            },
            {
                "slno": 26,
                "abb": "PY",
                "name": "Puducherry",
                "state": "puducherry"
            },
            {
                "slno": 27,
                "abb": "PB",
                "name": "Punjab",
                "state": "punjab"
            },
            {
                "slno": 28,
                "abb": "RJ",
                "name": "Rajasthan",
                "state": "rajasthan"
            },
            {
                "slno": 29,
                "abb": "SK",
                "name": "Sikkim",
                "state": "sikkim"
            },
            {
                "slno": 30,
                "abb": "TN",
                "name": "Tamil Nadu",
                "state": "tamil-nadu"
            },
            {
                "slno": 31,
                "abb": "TS",
                "name": "Telangana",
                "state": "telangana"
            },
            {
                "slno": 32,
                "abb": "TR",
                "name": "Tripura",
                "state": "tripura"
            },
            {
                "slno": 33,
                "abb": "UK",
                "name": "Uttar Pradesh",
                "state": "uttar-pradesh"
            },
            {
                "slno": 34,
                "abb": "UP",
                "name": "Uttarakhand",
                "state": "uttarakhand"
            },
            {
                "slno": 35,
                "abb": "WB",
                "name": "West Bengal",
                "state": "west-bengal"
            }
        ]
    )

    // Fetch countries data when component mounts
    useEffect(() => {
        // Replace 'https://restcountries.com/v3.1/all' with a real API endpoint for countries
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    return (
        <div className="p-2">
          
                <p>Please select your gender</p>
                <input
                    type="radio"
                    id="male"
                    value='male'
                    name="gender"
                    className="hover: outline-gray-500 rounded-lg p-2 m-2 cursor-pointer"
                    onChange={(e) => handleChange(e)}
                />
                <label htmlFor="male" id='radio' className="cursor-pointer">Male</label>

                <input
                    type="radio"
                    id="female"
                    value='female'
                    name="gender"
                    className="hover: outline-gray-500 rounded-lg p-2 m-2 cursor-pointer"
                    onChange={(e) => handleChange(e)}
                />
                <label htmlFor="female" id='radio' className="cursor-pointer">Female</label>

        
            <div>
                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    placeholder="Enter date of birth"
                    id="dob"
                    value={formData.dob}
                    name="dob"
                    className="hover: outline-gray-500 rounded-lg p-2 ml-2"
                    onChange={(e) => handleChange(e)}
                />
            </div>
      
            <div>
                <label htmlFor="add1">Address Line 1</label>
                <input
                    type="text"
                    placeholder="Enter address Line 1"
                    id="add1"
                    value={formData.add1}
                    name="add1"
                    className="hover: outline-gray-500 rounded-lg p-2 ml-2"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="add2">Address Line 2</label>
                <input
                    type="text"
                    placeholder="Enter address Line 2"
                    id="add2"
                    value={formData.add2}
                    name="add2"
                    className="hover: outline-gray-500 rounded-lg p-2 ml-2"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="landmark">LandMark</label>
                <input
                    type="text"
                    placeholder="Enter Nearby Landmark"
                    id="landmark"
                    value={formData.landmark}
                    name="landmark"
                    className="hover: outline-gray-500 rounded-lg p-2 ml-2"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="pin">PINCODE</label>
                <input
                    type="text"
                    placeholder="Enter Postal Code"
                    id="pin"
                    value={formData.pin}
                    name="pin"
                    className="hover: outline-gray-500 rounded-lg p-2 ml-2"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <select
                    id="country"
                    value={formData.country}
                    name="country"
                    onChange={(e) => handleChange(e)}
                    className="hover: outline-gray-500 rounded-lg p-1"

                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.alpha3Code} value={country.alpha3Code}>
                            {country.name.common}
                        </option>
                    ))}
                </select>
            </div>
            {/* <div>
                <label htmlFor="pin">State</label>
                <input
                    type="text"
                    placeholder="Enter state"
                    id="state"
                    value={formData.state}
                    name="state"
                    className="hover: outline-gray-500 rounded-lg p-2 ml-2"
                    onChange={(e) => handleChange(e)}
                />
            </div> */}
            
            <div>
                <label htmlFor="state">State</label>
                <select
                    id="state"
                    value={formData.state}
                    name="state"
                    onChange={(e) => handleChange(e)}
                    className="hover: outline-gray-500 rounded-lg p-1 ml-2"
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
    );
};

export default AdditionalFormPage;
