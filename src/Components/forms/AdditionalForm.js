import React, { useEffect, useState } from "react";
import { State } from "../../utils/constant";

const AdditionalFormPage = ({ formData, handleChange }) => {
    const [countries, setCountries] = useState([]);
    const [allStates] = useState(State);

    // Fetch countries data when component mounts
    useEffect(() => {
        // Replace 'https://restcountries.com/v3.1/all' with a real API endpoint for countries
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => setCountries(data));
    }, []);

    return (
        <div className="form-section">
            <p className="form-heading">Additional Information</p>
            <div className="form-fields">
                <div className="radio-group">
                    <label className="radio-label">Gender</label>
                    <div className="radio-options">
                        <input
                            type="radio"
                            id="male"
                            value='male'
                            name="gender"
                            className="radio-input"
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="male" className="radio-option">Male</label>

                        <input
                            type="radio"
                            id="female"
                            value='female'
                            name="gender"
                            className="radio-input"
                            onChange={(e) => handleChange(e)}
                        />
                        <label htmlFor="female" className="radio-option">Female</label>
                    </div>
                </div>

                <div className="form-field">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        placeholder="Enter date of birth"
                        id="dob"
                        value={formData.dob}
                        name="dob"
                        className="input-field"
                        onChange={(e) => handleChange(e)}
                    />
                </div>

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
        </div>
    );
};

export default AdditionalFormPage;
