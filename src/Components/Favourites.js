import React, { useState, useEffect } from 'react';
import { useAuth } from './Context/AuthProvider';
import axios from 'axios';
import { Grid } from '@mui/material';
import Cards from '../utils/Card';
import { useDispatch } from 'react-redux';
import { addItem } from './Redux/cartSlice';
import { useHook } from "../useHooks/CustomAPIHook";
import LoadingComponent from '../utils/LoadingComponent';


const Favourites = () => {
    const [err, setErr] = useState('');
    const [showMenu, setShowMenu] = useState(true);
    const [type, setType] = useState('');
    const dispatch = useDispatch();
    const { handleRemoveItem, fetchFavouriteData, favouriteData, loading } = useHook()

    const labels = [
        { name: 'Favourite Food', color: 'bg-food', id: 1, type: 'item' },
        { name: 'Favourite Restaurants', color: 'bg-Restaurant', id: 2, type: 'restaurant' },
    ];

    const handleDeleteItem = (email, data, type) => {
        handleRemoveItem(email, data, type)
    }

    useEffect(() => {
        fetchFavouriteData();
    }, []);

    const handleType = (label) => {
        console.log('label.type', label.type);
        setType(label.type);
        setShowMenu(false);
    };

    const mapLabels = () => {
        return labels.map((label) => (
            <div key={label.id} className='flex flex-wrap'>
                <div onClick={() => handleType(label)} className='favourite-tags'>
                    {label.name}
                </div>
            </div>
        ));
    };

    const handleAddItem = (name, email, info, type) => {
        dispatch(addItem({ info }))
        if (name.toLowerCase() === 'move') {
            handleRemoveItem(email, info, type)
        }
    };

    const showList = () => {
        if (type === 'restaurant') {
            let filteredData = favouriteData && favouriteData.restaurant.filter((data, index, array) => {
                return array.findIndex((obj) => obj.id === data.id) === index;
            });
            return (
                <div className='flex flex-wrap'>
                    {filteredData.map((data) => {
                        return (
                            <Cards key={data.id} data={data} type={type} handleDeleteItem={handleDeleteItem} />
                        )
                    })}
                </div>
            );
        } else if (type === 'item') {
            let filteredData = favouriteData && favouriteData.items.filter((data, index, array) => {
                return array.findIndex((obj) => obj.id === data.id) === index;
            });

            return (
                <div className='flex flex-wrap'>
                    {
                        filteredData.map((data) => (
                            <Cards key={data.id} data={data} type={type} handleDeleteItem={handleDeleteItem} handleAddItem={handleAddItem} />
                        ))}
                </div>
            );
        }
        return null;
    };

    const handleGoBack = () => {
        setShowMenu(true);
        setType('');
    };

    return (
        <div>
            {loading ? (
                <LoadingComponent />
            ) : (
                <div className='m-10'>
                    <h1 className='text-center font-bold text-purple-800 text-2xl'>Favourites</h1>
                    {showMenu !== true && type !== '' ?
                        <button className='button' onClick={handleGoBack}>
                            Go Back
                        </button> : ''
                    }
                    {showMenu ? (
                        <div className='w-full mx-auto h-[100%] my-20  cursor-pointer'>
                            {mapLabels()}
                        </div>
                    ) : (
                        <div className='flex flex-wrap'>{showList()}</div> // Corrected placement
                    )}

                </div>
            )}
        </div>
    );
};

export default Favourites;
