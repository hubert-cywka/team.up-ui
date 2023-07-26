'use client';

import Alert from '@components/primitives/alert/Alert';
import Button from '@components/primitives/button/Button';
import styles from '../SportPanelTabsShared.module.scss';
import Builder from '@shared/utility/Builder';
import { useEffect } from 'react';
import Input from '@components/primitives/input/Input';
import { useEditSportDiscipline } from '@shared/hooks/sport/useEditSportDiscipline';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { SportDisciplineNameValidation } from '@shared/constants/SportDisciplineConstants';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrEditSportDisciplineValidationSchema } from '@shared/constants/FormSchemas';
import { CreateSportDisciplineRequest, SportDiscipline } from '@shared/types/Sport';

interface SportEditTabProps {
  sportToEdit: SportDiscipline | null;
  onSuccess: () => void;
}

const SportEditTab = ({ sportToEdit, onSuccess }: SportEditTabProps) => {
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
    mutateAsync: updateSport,
    status: updateStatus,
    reset: resetUpdate,
    error: updateError
  } = useEditSportDiscipline({ onSuccess: onSuccess });

  useEffect(() => {
    if (sportToEdit) {
      resetAll();
    }
  }, [sportToEdit]);

  const resetAll = () => {
    resetUpdate();
    reset();
  };

  const handleEditSport = async () => {
    if (!sportToEdit) return;
    await updateSport({ ...sportToEdit, name: getValues('name') });
  };

  const buildErrorMessage = (error: AxiosError) => {
    if (!error?.response?.status) return '';
    const errorMessage = 'Failed to edit sport.';

    const reason = (() => {
      switch (error.response.status) {
        case 401:
          return 'User is not authorized.';

        case 403:
          return 'This action is forbidden.';

        case 404:
          return 'Sport not found. Someone could deleted it earlier.';

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
      {Builder.createResult(updateStatus)
        .onSuccess(
          <>
            <Alert message="Sport discipline updated" variant="success" />
            <Button variant="success" onClick={resetAll}>
              OK
            </Button>
          </>
        )
        .onError(
          <>
            <Alert message={buildErrorMessage(updateError as AxiosError)} variant="error" />
            <Button variant="error" onClick={resetAll}>
              OK
            </Button>
          </>
        )
        .onIdle(
          sportToEdit ? (
            <form onSubmit={handleSubmit(handleEditSport)}>
              <p className={styles.info}>
                You are about to edit <b>{sportToEdit.name}</b>. All related events will be{' '}
                <b>updated, but not deleted.</b> Name has to be unique.
              </p>
              <div className={styles.inputRow}>
                <Input
                  variant="secondary"
                  {...register('name')}
                  className={styles.input}
                  fullWidth
                />
                <p className={classNames(styles.inputMessage, { [styles.error]: !!errors.name })}>
                  {errors.name ? errors.name.message : SportDisciplineNameValidation.INFO}
                </p>
                <Button variant="success" type="submit">
                  UPDATE
                </Button>
              </div>
            </form>
          ) : (
            <Alert message="Select sport discipline you want to update." />
          )
        )
        .build()}
    </div>
  );
};

export default SportEditTab;
