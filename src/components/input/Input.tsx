import PropTypes from 'prop-types';
import { ChangeEvent } from 'react';
import styles from './Input.module.scss';
import appStyles from '../../App.module.scss';
import { IInputProps } from "./ts/models/input-props.model";

const Input = ({ label, placeholder, haveError, errorText, children, inputChangeEvent }: IInputProps) => {
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => inputChangeEvent(event.target.value);

    return (<div>
        <span className={`${styles.label} ${haveError ? styles['error--label'] : ''}`}>{label}</span>

        <input type="text" placeholder={placeholder} data-testid="input"
            className={haveError ? styles['error--input'] : ''} onChange={event => onInputChange(event)} />

        {haveError && <span className={appStyles['error--input-text']}>{errorText}</span>}

        {children}
    </div>);
};

export default Input;

Input.propTypes = {
    children: PropTypes.node,
    label: PropTypes.string.isRequired,
    haveError: PropTypes.bool.isRequired,
    errorText: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    inputChangeEvent: PropTypes.func.isRequired
};