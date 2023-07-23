import Alert from '@components/primitives/alert/Alert';
import Button from '@components/primitives/button/Button';
import styles from '../SportPanelTabsShared.module.scss';
import Builder from '@shared/utility/Builder';
import { AxiosError } from 'axios';
import { CreateSportDisciplineRequest } from '@shared/types/Sport';
import { useAddSportDiscipline } from '@shared/hooks/sport/useAddSportDiscipline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrEditSportDisciplineValidationSchema } from '@shared/constants/FormSchemas';
import Input from '@components/primitives/input/Input';
import classNames from 'classnames';
import { SportDisciplineNameValidation } from '@shared/constants/SportDisciplineConstants';

const SportAddTab = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm<CreateSportDisciplineRequest>({
    mode: 'onChange',
    resolver: yupResolver(addOrEditSportDisciplineValidationSchema)
  });

  const {
    mutateAsync: addSport,
    status: addStatus,
    reset: resetAdd,
    error: addError
  } = useAddSportDiscipline();

  const resetAll = () => {
    resetAdd();
    reset();
  };

  const handleAddSport = async () => {
    await addSport({ name: getValues('name') });
  };

  const buildErrorMessage = (error: AxiosError) => {
    if (!error?.response?.status) return '';
    const errorMessage = 'Failed to add sport.';

    const reason = (() => {
      switch (error.response.status) {
        case 401:
          return 'User is not authorized.';

        case 403:
          return 'This action is forbidden.';

        case 409:
          return 'Sport with that name already exists.';

        default:
          return 'Unexpected server error happened.';
      }
    })();

    return errorMessage.concat(' ', reason);
  };

  return (
    <div className={styles.sportEditTab}>
      {Builder.createResult(addStatus)
        .onSuccess(
          <>
            <Alert message="Sport discipline added" variant="success" />
            <Button variant="success" onClick={resetAll}>
              OK
            </Button>
          </>
        )
        .onError(
          <>
            <Alert message={buildErrorMessage(addError as AxiosError)} variant="error" />
            <Button variant="error" onClick={resetAll}>
              OK
            </Button>
          </>
        )
        .onIdle(
          <form onSubmit={handleSubmit(handleAddSport)}>
            <p className={styles.info}>
              Add new sport discipline. <b>Name has to be unique.</b>
            </p>
            <div className={styles.inputRow}>
              <Input variant="secondary" {...register('name')} className={styles.input} fullWidth />
              <p className={classNames(styles.inputMessage, { [styles.error]: !!errors.name })}>
                {errors.name ? errors.name.message : SportDisciplineNameValidation.INFO}
              </p>
              <Button variant="success" type="submit">
                ADD
              </Button>
            </div>
          </form>
        )
        .build()}
    </div>
  );
};

export default SportAddTab;
