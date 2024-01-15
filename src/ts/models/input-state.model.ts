import { IAgeState } from "./age-state.model";
import { IDataState } from "./data-state.model";

export interface IInputState {
    age: IAgeState;
    submitted: boolean;
    invalidDate: boolean;
    day: IDataState;
    month: IDataState;
    year: IDataState;
}
