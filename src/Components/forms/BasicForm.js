import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import AdditionalFormPage from "./AdditionalForm";
import axios from "axios";

const BasicDetails = () => {
    const { setAuth, auth, user, login } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        step: 1,
        name: user.name || '',
        email: user.email || '',
        _id: user._id || '',
        password: user.password || '',
        gender: user.gender || '',
        dob: user.dob || '',
        add1: user.add1 || '',
        add2: user.add2 || '',
        landmark: user.landmark || '',
        pin: user.pin || '',
        state: user.state || '',
        country: user.country || '',
        imageURL : user.imageURL || ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        try {
            const response = await axios.post(
                "http://localhost:8000/user/update",
                formData,
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

    const handleDecreaseStep = (e) => {
        e.preventDefault()
        const step = formData.step
        console.log('step', step)
        if (step > 1) {
            setFormData({ ...formData, step: Number(step) - 1 })
        }
    }

    const handleIncreaseStep = (e) => {
        e.preventDefault()
        const step = formData.step
        console.log('step', step)
        setFormData({ ...formData, step: Number(step) + 1 })
    }

    const handleGoBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    console.log('stp outside', formData.step)

    const renderForm = () => {
        switch (formData.step) {
            case 1:
                return (
                    <div className="flex flex-wrap flex-col gap-4 ml-4 my-2 ">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Enter name" id="name" value={formData.name} name="name" className="outline-2 rounded-lg p-2" onChange={handleChange} />

                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" id="email"
                            value={formData.email} name="email"
                            className="bg-gray-300 outline-none rounded-lg  p-2"
                            readOnly
                        />

                        <label htmlFor="_id">ID</label>
                        <input type="text" placeholder="Enter ID" id="_id"
                            value={formData._id} name="_id"
                            className="bg-gray-300 outline-none rounded-lg  p-2"
                            readOnly
                        />

                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" id="password"
                            value={formData.password} name="password"
                            className="rounded-lg  p-2"
                            onChange={handleChange}
                        />
                    </div>
                )

            case 2:
                return <AdditionalFormPage formData={formData} handleChange={handleChange} />;
            default:
                return null
        }
    }

    return (
        <div>
            <h1 className="member-name text-center"> Edit Details</h1>
            <div className="w-96 h-full mx-auto my-6 flex border-2 p-4 justify-start">
                <form className="flex flex-wrap flex-col gap-4 ml-4 my-2 " onSubmit={handleSubmit}>
                    {renderForm()}
                    <button className="bg-teal-400 hover:bg-teal-200 h-10 rounded-lg w-80">Submit</button>
                    <div className="flex justify-evenly">
                        <button onClick={handleGoBack}>Back</button>

                        <button onClick={handleDecreaseStep}>Previous</button>
                        <button onClick={handleIncreaseStep}>Next</button>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default BasicDetails