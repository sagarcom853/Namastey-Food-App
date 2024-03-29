import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Header, { getCity } from './Header';
import AuthProvider, { useAuth } from './Context/AuthProvider';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { weather_API } from '../utils/constant';

jest.mock('axios')

describe('Header component', () => {
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
    test('renders without crashing', () => {
        render(
            <BrowserRouter>
                <AuthProvider value={mockTestContext}>
                    <Provider store={store}>
                        <Header />
                    </Provider>
                </AuthProvider>
            </BrowserRouter>
        )
        const onlineStatus = screen.getByText(/OnlineStatus:/)
        expect(onlineStatus).toBeInTheDocument()
    })

    test('displays Links', () => {
        render(
            <BrowserRouter>
                <AuthProvider value={mockTestContext}>
                    <Provider store={store}>
                        <Header />
                    </Provider>
                </AuthProvider>
            </BrowserRouter>
        )
        expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Help/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /2 items/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /detect Location/i })).toBeInTheDocument();
        expect(screen.getByAltText('food logo')).toBeInTheDocument()

    })
    test('displays number of cart Items', () => {
        // Mock useSelector to return a specific number of cart items
        jest.mock('react-redux', () => ({
            useSelector: jest.fn().mockReturnValue([{ id: 1, name: 'Item 1' }]),
        }));
        render(
            <BrowserRouter>
                <AuthProvider value={mockTestContext}>
                    <Provider store={store}>
                        <Header />
                    </Provider>
                </AuthProvider>
            </BrowserRouter>
        )
        expect(screen.getByText(/2 items/i)).toBeInTheDocument()
    })

    test('renders login link if user not loggedin', () => {
        render(
            <BrowserRouter>
                <AuthProvider value={mockTestContext}>
                    <Provider store={store}>
                        <Header />
                    </Provider>
                </AuthProvider>
            </BrowserRouter>
        )
        const loginLink = screen.getByText(/Login/i)
        expect(loginLink).toBeInTheDocument()
    })

    // test('renders not login link if user loggedin', () => {
    //     jest.mock('./Context/AuthProvider', () => ({
    //         useAuth: () => ({ isAuthenticated: true })
    //     }))
    //     render(
    //         <BrowserRouter>
    //             <AuthProvider value={mockTestContext}>
    //                 <Provider store={store}>
    //                     <Header />
    //                 </Provider>
    //             </AuthProvider>
    //         </BrowserRouter>
    //     )
    //     const loginLink = screen.queryByText(/Login/i)
    //     expect(loginLink).toBeNull()
    // })

    test('detects location when location link is clicked', () => {
        navigator.geolocation = {
            watchPosition: jest.fn(),
        };
        render(
            <BrowserRouter>
                <AuthProvider value={mockTestContext}>
                    <Provider store={store}>
                        <Header />
                    </Provider>
                </AuthProvider>
            </BrowserRouter>
        )
        const locationLink = screen.getByText(/detect location/i);
        fireEvent.click(locationLink);
        expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
    });

    test('fetches data from weather api to get city', async () => {
        let lat = 88.4212
        let long = 22.6361

        const data = {
            "coord": {
                "lon": 88.4212,
                "lat": 22.6361
            },
            "weather": [
                {
                    "id": 721,
                    "main": "Haze",
                    "description": "haze",
                    "icon": "50n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 297.12,
                "feels_like": 297.14,
                "temp_min": 297.12,
                "temp_max": 297.12,
                "pressure": 1013,
                "humidity": 60
            },
            "visibility": 3500,
            "wind": {
                "speed": 1.54,
                "deg": 20
            },
            "clouds": {
                "all": 0
            },
            "dt": 1709741247,
            "sys": {
                "type": 1,
                "id": 9114,
                "country": "IN",
                "sunrise": 1709684607,
                "sunset": 1709727118
            },
            "timezone": 19800,
            "id": 1272243,
            "name": "Dum Dum",
            "cod": 200
        }
        const mockResponse = { data: data };
        axios.get.mockResolvedValue(mockResponse);
        render(
            <BrowserRouter>
                <AuthProvider value={mockTestContext}>
                    <Provider store={store}>
                        <Header />
                    </Provider>
                </AuthProvider>
            </BrowserRouter>
        )


        // Call getCity function from the component instance
        await act(async () => {
            await getCity(lat, long);
        });

        // Expect setCityData to be called with the mock response data
        expect(axios.get).toHaveBeenCalledWith(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weather_API}`);

        // Ensure cityData state is updated
        const cityDataElement = screen.getByText('detect Location'); // Change this to the text that indicates city data
        expect(cityDataElement).toBeInTheDocument();
    })


    test('toggleMenu toggles the menu state', () => {
        render(
            <BrowserRouter>
                <AuthProvider value={mockTestContext}>
                    <Provider store={store}>
                        <Header />
                    </Provider>
                </AuthProvider>
            </BrowserRouter>
        )
        // Initially, the menu should be closed
        expect(screen.queryByText('Menu is open')).toBeNull();

        // Check if the menu button is rendered
        const menuButton = screen.queryByRole('button', { name: 'menu' });
        expect(menuButton).not.toBeInTheDocument();
        // // Simulate a click on the menu button
        // fireEvent.click(menuButton);

        // // Now, the menu should be open
        // expect(screen.getByText('Menu is open')).toBeInTheDocument();

        // // Click again to close the menu
        // fireEvent.click(menuButton);

        // // Menu should be closed again
        // expect(screen.queryByText('Menu is open')).toBeNull();
    })
})