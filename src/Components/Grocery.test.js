import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Grocery from "./Grocery"

describe('Grocery Component', () => {
    test('it should render grocery component', () => {
        render(<Grocery />)
        const GroceryHeading = screen.getByText(/Hello Welcome to Namaste Grocery/)
        expect(GroceryHeading).toBeInTheDocument()
    })
})