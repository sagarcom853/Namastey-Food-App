import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
});

export default store;
