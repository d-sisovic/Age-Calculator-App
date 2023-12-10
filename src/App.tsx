import styles from './App.module.scss';
import CountingNumber from './CountingNumber';
import { IAgeState } from './ts/age-state.model';
import circle from './assets/images/icon-arrow.svg';
import { IInputState } from './ts/input-state.model';
import { ChangeEvent, useRef, useState } from 'react';

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
  const dayRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);

  const [inputState, setInputState] = useState<IInputState>(initialInputState);
  const haveError = inputState.invalidDate || (inputState.submitted && (inputState.day.error || inputState.month.error || inputState.year.error));

  const onSubmitDate = () => {
    const { day, month, year } = inputState;
    const dayValue = +day.value;
    const monthValue = +month.value;

    const maxDaysInMonth = new Date(new Date().getFullYear(), monthValue, 0).getDate();
    const isValidDay = dayValue >= 1 && dayValue <= maxDaysInMonth;
    const age = calculateAge(+day.value, +month.value, +year.value);

    setInputState(previous => ({ ...previous, submitted: true, invalidDate: !isValidDay, age }));
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>, key: 'day' | 'month' | 'year') => {
    const { value } = event.target;
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

  const showAgeResult = !haveError && inputState.submitted;
  const showBlankResult = haveError || !inputState.submitted;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles['card__input']}>
          <div>
            <span className={haveError ? styles['error--label'] : ''}>Day</span>

            <input type="text" placeholder="DD" ref={dayRef} data-testid="input"
              className={haveError ? styles['error--input'] : ''} onChange={event => onInputChange(event, 'day')} />

            {haveError && <span className={styles['card__input--error']}>{inputState.day.error}</span>}
            {inputState.invalidDate && <span className={styles['card__input--error']}>Must be a valid date</span>}
          </div>

          <div>
            <span className={haveError ? styles['error--label'] : ''}>Month</span>

            <input type="text" placeholder="MM" ref={monthRef} data-testid="input"
              className={haveError ? styles['error--input'] : ''} onChange={event => onInputChange(event, 'month')} />

            {haveError && <span className={styles['card__input--error']}>{inputState.month.error}</span>}
          </div>

          <div>
            <span className={haveError ? styles['error--label'] : ''}>Year</span>

            <input type="text" placeholder="YYYY" ref={yearRef} data-testid="input"
              className={haveError ? styles['error--input'] : ''} onChange={event => onInputChange(event, 'year')} />

            {haveError && <span className={styles['card__input--error']}>{inputState.year.error}</span>}
          </div>
        </div>

        <div className={styles['card__button']} onClick={onSubmitDate} data-testid="submit">
          <img src={circle} alt="circle" />
        </div>

        <div className={styles['card__result']}>
          <div>
            <span className={styles['card__result--value']} data-testid="result">
              {showBlankResult && '--'}
              {showAgeResult && <CountingNumber endValue={inputState.age.years} />}
            </span>
            <span>years</span>
          </div>

          <div>
            <span className={styles['card__result--value']} data-testid="result">
              {showBlankResult && '--'}
              {showAgeResult && <CountingNumber endValue={inputState.age.months} />}
            </span>
            <span>months</span>
          </div>

          <div>
            <span className={styles['card__result--value']} data-testid="result">
              {showBlankResult && '--'}
              {showAgeResult && <CountingNumber endValue={inputState.age.days} />}
            </span>
            <span>days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
