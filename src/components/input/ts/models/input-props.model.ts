export interface IInputProps {
    label: string;
    errorText: string;
    haveError: boolean;
    placeholder: string;

    children?: React.ReactNode;

    inputChangeEvent: (value: string) => void;
}
