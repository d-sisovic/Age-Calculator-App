import styles from './Output.module.scss';
import CountingNumber from "../../CountingNumber";
import { IOutputProps } from "./ts/models/output-props.model";

const Output = ({ label, showAgeResult, value }: IOutputProps) => {
    return <div className={styles.container}>
        <span className={styles.value} data-testid="result">
            {!showAgeResult && '--'}
            {showAgeResult && <CountingNumber endValue={value} />}
        </span>
        <span>{label}</span>
    </div>;
};

export default Output;
