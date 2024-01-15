import Output from './Output';

export default {
    title: 'Output',
    component: Output,
    tags: ['autodocs']
};

export const OrdinaryInputWithAgeShown = {
    args: {
        value: 26,
        label: 'years',
        showAgeResult: true
    }
}

export const OrdinaryInputWithAgeHidden = {
    args: {
        value: 26,
        label: 'years',
        showAgeResult: false
    }
}