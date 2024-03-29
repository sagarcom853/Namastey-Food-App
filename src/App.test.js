import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import App from "./App"
import configureStore  from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './Components/Context/AuthProvider';

describe('App component', () => {
    const mockTestContext = {
        isAuthenticated: 'true',
        logout: jest.fn(),
        user: {
            name: 'sagar',
        }
    }
    const mockStore = configureStore([])
    const initialState = {
        cart: {
            items: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ]
        }
    }
    const store = mockStore(initialState);
    test('Loads App componenent', () => {
        return (
            <BrowserRouter>
                <AuthProvider value={mockTestContext}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </AuthProvider>
            </BrowserRouter>
        )
    })
})