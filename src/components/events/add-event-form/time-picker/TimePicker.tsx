import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from '@components/primitives/input/Input';
import styles from './TimePicker.module.scss';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

interface TimePickerProps extends ReactDatePickerProps {
  iconClassName?: string;
}

const TimePicker = ({ iconClassName, ...props }: TimePickerProps) => {
  return (
    <DatePicker
      customInput={
        <Input icon={faCalendar} iconClassName={iconClassName} className={styles.timePicker} />
      }
      {...props}
      minDate={new Date()}
      showTimeSelect
      dateFormat="Pp"
    />
  );
};

export default TimePicker;
