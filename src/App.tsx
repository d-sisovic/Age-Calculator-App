import { useState } from 'react';
import styles from './App.module.scss';
import Input from './components/input/Input';
import Output from './components/output/Output';
import circle from './assets/images/icon-arrow.svg';
import { ValueKey } from './ts/types/value-key.type';
import { IAgeState } from './ts/models/age-state.model';
import { IInputState } from './ts/models/input-state.model';

const initialInputState = {
  submitted: false,
  invalidDate: false,
  day: { value: '', error: '' },
  month: { value: '', error: '' },
  year: { value: '', error: '' },
  age: { days: 0, months: 0, years: 0 }
};

const calculateAge = (day: number, month: number, year: number): IAgeState => {
  const today = new Date();
  const targetDate = new Date(year, month - 1, day);

  let days = today.getDate() - targetDate.getDate();
  let months = today.getMonth() - targetDate.getMonth();
  const years = today.getFullYear() - targetDate.getFullYear();

  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const daysInLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).getDate();
    days = daysInLastMonth + days;
  }

  if (months < 0) { months += 12; }

  return { years, months, days };
};

const App = () => {
  const [inputState, setInputState] = useState<IInputState>(initialInputState);
  const haveError = inputState.invalidDate || (inputState.submitted && (inputState.day.error || inputState.month.error || inputState.year.error));

  const showAgeResult = !haveError && inputState.submitted;

  const onSubmitDate = () => {
    const { day, month, year } = inputState;
    const dayValue = +day.value;
    const monthValue = +month.value;

    const maxDaysInMonth = new Date(new Date().getFullYear(), monthValue, 0).getDate();
    const isValidDay = dayValue >= 1 && dayValue <= maxDaysInMonth;
    const age = calculateAge(+day.value, +month.value, +year.value);

    setInputState(previous => ({ ...previous, submitted: true, invalidDate: !isValidDay, age }));
  };

  const onInputChange = (value: string, key: ValueKey) => {
    const parsedValue = Number.parseInt(value);
    const invalidParsedValue = Number.isNaN(parsedValue);
    const requiredError = value.trim() === '' ? 'This field is required' : invalidParsedValue ? 'This field must have valid value' : '';

    switch (key) {
      case 'day':
        // eslint-disable-next-line no-case-declarations
        const dayError = parsedValue < 1 || parsedValue > 31 ? 'Must be a valid day' : '';

        setInputState(previous => ({ ...previous, [key]: { value, error: requiredError || dayError } }));
        break;
      case 'month':
        // eslint-disable-next-line no-case-declarations
        const monthError = parsedValue < 1 || parsedValue > 12 ? 'Must be a valid month' : '';

        setInputState(previous => ({ ...previous, [key]: { value, error: requiredError || monthError } }));
        break;
      case 'year':
        // eslint-disable-next-line no-case-declarations
        const yearError = parsedValue > new Date().getFullYear() ? 'Must be in the past' : '';

        setInputState(previous => ({ ...previous, [key]: { value, error: requiredError || yearError } }));
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['card__input']}>
          <Input label='Day' placeholder='DD'
            haveError={!!haveError} errorText={inputState.day.error} inputChangeEvent={value => onInputChange(value, 'day')} >
            {inputState.invalidDate && <span className={styles['error--input-text']}>Must be a valid date</span>}
          </Input>

          <Input label='Month' placeholder='MM'
            haveError={!!haveError} errorText={inputState.month.error} inputChangeEvent={value => onInputChange(value, 'month')} >
          </Input>

          <Input label='Year' placeholder='YYYY'
            haveError={!!haveError} errorText={inputState.year.error} inputChangeEvent={value => onInputChange(value, 'year')} >
          </Input>
        </div>

        <div className={styles['card__button']} onClick={onSubmitDate} data-testid="submit">
          <img src={circle} alt="circle" />
        </div>

        <div className={styles['card__result']}>
          <Output label='years' showAgeResult={showAgeResult} value={inputState.age.years}></Output>

          <Output label='months' showAgeResult={showAgeResult} value={inputState.age.months}></Output>

          <Output label='days' showAgeResult={showAgeResult} value={inputState.age.days}></Output>
        </div>
      </div>
    </div>
  );
};

export default App;
