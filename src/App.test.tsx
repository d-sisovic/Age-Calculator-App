import App from "./App";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

describe('App component ', () => {
    beforeEach(() => render(<App />));

    it('should show initial state', () => {
        const inputs = screen.getAllByTestId('input');
        const resultElements = screen.getAllByTestId('result');

        expect(inputs).toHaveLength(3);

        for (const item of resultElements) {
            expect(item).toHaveTextContent('--');
        }
    });

    it('should show error when no fields are filled', () => {
        const submit = screen.getByTestId('submit');

        fireEvent.click(submit);

        const invalidErrorElemenet = screen.getByText('Must be a valid date');

        expect(invalidErrorElemenet).toBeVisible();
    });

    it('should show error when month is over 12', () => {
        const submit = screen.getByTestId('submit');
        const [, monthInput] = screen.getAllByTestId('input');

        fireEvent.change(monthInput, { target: { value: '13' } });

        fireEvent.click(submit);

        const invalidErrorElemenet = screen.getByText('Must be a valid month');

        expect(invalidErrorElemenet).toBeVisible();
    });

    it('should show correct result, when inputs are fine', async () => {
        const inputValues = [10, 6, 1995];
        const resultValues = ['29', '7', '5'];
        const submit = screen.getByTestId('submit');
        const inputs = screen.getAllByTestId('input');

        inputs.forEach((input, index) => fireEvent.change(input, { target: { value: inputValues[index] } }));

        fireEvent.click(submit);

        await waitFor(() => {
            const resultElements = screen.getAllByTestId('result');

            resultElements.forEach((item, index) => {
                expect(item).toHaveTextContent(resultValues[index]);
            });
        });
    });
});
