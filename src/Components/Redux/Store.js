import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./cartSlice";
import commentReducer from "./CommentSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        comments: commentReducer
    }
});

export default store;
