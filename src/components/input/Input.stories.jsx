import Input from './Input';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Input',
    component: Input,
    tags: ['autodocs']
};

export const DayInput = {
    args: {
        label: "Day",
        placeholder: "DD"
    }
};

export const DayInputWithError = {
    args: {
        ...DayInput.args,
        haveError: true,
        errorText: 'Must be a valid day'
    }
};

export const DayInputWithChildren = {
    args: {
        ...DayInput.args,
        children: <p>Additional text to render children</p>
    }
};

export const DayInputWithEvent = {
    args: {
        ...DayInput.args,
        inputChangeEvent: event => { action('Input value')(event); }
    }
};