import { PulseLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <PulseLoader
      color="orange"
      style={{ margin: 'auto', borderColor: 'orange', padding: '10px' }}
    />
  );
};

export default Spinner;
