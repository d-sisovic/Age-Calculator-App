import { IAgeState } from "./age-state.model";

export interface IInputState {
    age: IAgeState;
    submitted: boolean;
    invalidDate: boolean;
    day: { value: string, error: string };
    month: { value: string, error: string };
    year: { value: string, error: string };
}
