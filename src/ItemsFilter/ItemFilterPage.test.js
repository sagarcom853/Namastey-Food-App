import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemFilterPage from "./ItemFilterPage"
import { BrowserRouter } from 'react-router-dom';

describe('ItemPage Component is Loading', () => {
    test('renders data correctly after fetching', async () => {
        // Mocking the API response
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: async () => ({
                data: {
                    cards: [
                        { card: { card: { title: 'header title', description: 'header description' } } },
                        { card: { card: { menu: [{ id: 1, name: 'menu 1' }] } } },
                        { card: { card: { gridElements: { infoWithStyle: { text: 'text explore' } } } } }
                    ]
                }
            })
        });

        render(<BrowserRouter>
            <ItemFilterPage />
        </BrowserRouter>);
        // Wait for the loading state to disappear
        await screen.findByText(/header title/i);
        // Ensure that the header data is rendered correctly
        expect(screen.getByText(/header title/i)).toBeInTheDocument();
        expect(screen.getByText(/header description/i)).toBeInTheDocument();
        // Ensure that filter menu data is rendered correctly
        expect(screen.getByText(/menu 1/i)).toBeInTheDocument();
        // Ensure that text explore data is rendered correctly
        expect(screen.getByText(/text explore/i)).toBeInTheDocument();
    });

})  