import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HelpPage from './HelpPage';
import { FAQ } from '../utils/constant';

describe('HelpPage Component', () => {
    it('should render the HelpPage FaQs', () => {
        render(<HelpPage />)
        const FaqText = screen.getByText(`FAQ's`)
        expect(FaqText).toBeInTheDocument()
    })

    test('renders FAQ titles length correctly', () => {
        render(<HelpPage />);
        const faqTitles = screen.getAllByRole('button');
        expect(faqTitles).toHaveLength(FAQ.length);
    });

    test('renders FAQ titles correctly', () => {
        render(<HelpPage />)
        const faqTitles = screen.getAllByRole('button');
        FAQ.forEach((faq, index) => {
            expect(faqTitles[index].textContent).toBe(faq.title.toString());
        });
    })

    test('expands accordion on click', () => {
        render(<HelpPage />)
        const accordionSummaries = screen.getAllByRole('button');
        fireEvent.click(accordionSummaries[0])
        expect(accordionSummaries[0].getAttribute('aria-expanded')).toBe('true');
    })

    test('collapses accordion on double click', () => {
        render(<HelpPage />)
        const accordionSummary = screen.getAllByRole('button')
        fireEvent.click(accordionSummary[0])
        fireEvent.click(accordionSummary[0])
        expect(accordionSummary[0].getAttribute('aria-expanded')).toBe('false')
    })

    test('description appears on click of accordion', () => {
        render(<HelpPage />)
        const accordionButton = screen.getAllByRole('button')
        FAQ.forEach((faq, index) => {
            fireEvent.click(accordionButton[0])
            const descriptionElement = screen.getByTestId(`description-${index}`);
            // Assert that description element exists
            expect(descriptionElement).toBeInTheDocument();
            // Assert that description text matches the FAQ item
            expect(descriptionElement.textContent).toBe(faq.description.toString());
        })


    })
})