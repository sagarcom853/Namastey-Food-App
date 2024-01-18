import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../Components/Context/AuthProvider'

export const useHook = () => {
    const { user, auth, setAuth } = useAuth()
    const [hooksErr, setErr] = useState('')
    const [favouriteData, setFavouriteData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchFavouriteData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/fetchFavourites?email=${user.email}`);
            if (response.status === 200) {
                setLoading(false);
                setFavouriteData(response.data);
            }
        } catch (error) {
            setLoading(false);
            if (error.response) {
                if (error.response.data.message) {
                    setErr(error.response.data.message || 'Details not Found');
                }
            }
        }
    };

    const handleRemoveItem = async (email, data, type) => {
        try {
            const response = await axios.post('http://localhost:8000/user/deleteFavourite',
                { email: email, type: type, itemId: data.id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            if (response.status === 200) {
                setAuth({ ...auth, isAuthenticated: true, user: response.data.user })
                setErr('')
                fetchFavouriteData();
            }
            else {
                setErr('Unexpected error occurred.');
            }
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setErr("Please login to add remove items...")
                } else {
                    setErr(error.response.data.message || 'An error occurred.');
                }
            } else if (error.request) {
                setErr('No response received from the server.');
            } else {
                setErr('Error setting up the request.');
            }
        }
    }

    const addedTocart = async (email, cart) => {
        try {
            const response = await axios.post('http://localhost:8000/user/temporaryCart', {
                email: email, cart: cart
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (response.status === 200) {
                setAuth({ ...auth, isAuthenticated: true, user: response.data.user });
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setErr("Items not there...........")
                } else {
                    setErr(error.response.data.message || 'An error occurred.');
                }
            } else if (error.request) {
                setErr('No response received from the server.');
            } else {
                setErr('Error setting up the request.');
            }
        }
    }

    useEffect(() => {
    }, [user])
    return {
        handleRemoveItem,
        fetchFavouriteData,
        hooksErr,
        favouriteData,
        addedTocart,
        loading,
    
        // Include any additional values you want to expose
    };
}

