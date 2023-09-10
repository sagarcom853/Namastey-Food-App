import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState: {
            items: [],
            dark: false
        },
        reducers: {
            addItem: (state, action) => {
                const newItem = action.payload
                console.log("newItem", newItem)
                const existingItem = state.items.find((item) => item.info?.id === newItem.info?.id)
                console.log('exstingItem', existingItem)
                if (existingItem) {
                    existingItem.quantity += 1
                }
                else {
                    state.items.push({ ...newItem, quantity: 1 })
                }
            },
            removeItem: (state, action) => {
                const itemIdToRemove = action.payload;
                console.log('itemIdToRemove', itemIdToRemove)
                const existingItem = state.items.find((item, index) => index === itemIdToRemove);
                console.log('existingItem', existingItem)
                if (existingItem) {
                    if (existingItem.quantity === 1) {
                        state.items = state.items.filter((item, index) => index !== itemIdToRemove);
                    } else {
                        existingItem.quantity -= 1;
                    }
                }
            },
            clearCart: (state) => {
                 state.items.length = 0
            },

            themeReducer: (state, action) => {
                if (action.payload === "dark") {
                    state.dark = true
                }
                else if (action.payload === "light") {
                    state.dark = false
                }
            }

        }
    }

)
export const { addItem, removeItem, clearCart, themeReducer } = cartSlice.actions
export default cartSlice.reducer



