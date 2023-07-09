import { SportsEditPanelMode } from '../SportShared';
import Alert from 'components/primitives/alert/Alert';
import Button from 'components/primitives/button/Button';
import { useDeleteSportDiscipline } from 'shared/hooks/sport/useDeleteSportDiscipline';
import styles from './SportEditPanel.module.scss';
import Builder, { BuilderStatus } from 'shared/utility/Builder';
import { useEffect } from 'react';
import Input from 'components/primitives/input/Input';
import { useAddSportDiscipline } from 'shared/hooks/sport/useAddSportDiscipline';
import { useEditSportDiscipline } from 'shared/hooks/sport/useEditSportDiscipline';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { SportNameValidation } from 'shared/constants/SportConstants';
import { yupResolver } from '@hookform/resolvers/yup';
import { addOrEditSportDisciplineValidationSchema } from 'shared/constants/FormSchemas';
import { CreateSportDisciplineRequest, SportDiscipline } from 'shared/types/Sport';

interface SportEditPanelProps {
  mode: SportsEditPanelMode;
  sportToEdit: SportDiscipline | undefined;
  onSuccess: () => void;
}

const SportEditPanel = ({ mode, sportToEdit, onSuccess }: SportEditPanelProps) => {
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
    mutateAsync: deleteSport,
    status: deleteStatus,
    reset: resetDelete,
    error: deleteError
  } = useDeleteSportDiscipline({ onSuccess: onSuccess });

  const {
    mutateAsync: addSport,
    status: addStatus,
    reset: resetAdd,
    error: addError
  } = useAddSportDiscipline({ onSuccess: onSuccess });

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

  useEffect(() => {
    resetAll();
  }, [mode]);

  const resetAll = () => {
    resetDelete();
    resetUpdate();
    resetAdd();
    reset();
  };

  const handleAddSport = async () => {
    await addSport({ name: getValues('name') });
  };

  const handleEditSport = async () => {
    if (!sportToEdit) return;
    await updateSport({ ...sportToEdit, name: getValues('name') });
  };

  const getCombinedStatus = (): BuilderStatus => {
    const statusArray = [updateStatus, addStatus, deleteStatus];
    if (statusArray.includes('loading')) return 'loading';
    if (statusArray.includes('error')) return 'error';
    if (statusArray.includes('success')) return 'success';
    return 'idle';
  };

  const getSportNameInput = () => {
    return (
      <>
        <Input {...register('name')} className={styles.input} />
        <p className={classNames(styles.inputMessage, { [styles.error]: !!errors.name })}>
          {errors.name ? errors.name.message : SportNameValidation.INFO}
        </p>
      </>
    );
  };

  const getSelectSportAlert = () => {
    return <Alert content={`Select sport discipline you want to ${mode}.`} />;
  };

  const buildAlertWithConfirmButton = (variant: 'success' | 'error', text: string) => {
    return (
      <>
        <Alert content={text} variant={variant} />
        <Button variant={variant} onClick={resetAll}>
          OK
        </Button>
      </>
    );
  };

  const buildErrorMessage = (error: AxiosError) => {
    if (!error?.response?.status) return '';

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
  };

  const buildPanelOnError = () => {
    const { errorMessage, error } = (() => {
      switch (mode) {
        case 'edit':
          return { errorMessage: 'Failed to update sport discipline.', error: updateError };

        case 'add':
          return { errorMessage: 'Failed to add sport discipline.', error: addError };

        case 'delete':
          return { errorMessage: 'Failed to delete sport discipline.', error: deleteError };
      }
    })();

    return buildAlertWithConfirmButton(
      'error',
      errorMessage.concat(' ', buildErrorMessage(error as AxiosError))
    );
  };

  const buildPanelOnSuccess = () => {
    const successMessage = (() => {
      switch (mode) {
        case 'edit':
          return 'Sport discipline updated!';

        case 'add':
          return 'Sport discipline added!';

        case 'delete':
          return 'Sport discipline deleted!';
      }
    })();

    return buildAlertWithConfirmButton('success', successMessage);
  };

  const buildPanelOnIdle = () => {
    if (mode === 'edit' && sportToEdit) {
      return (
        <form onSubmit={handleSubmit(handleEditSport)}>
          <p className={styles.info}>
            You are about to edit <b>{sportToEdit.name}</b>. All related events will be{' '}
            <b>updated, but not deleted.</b> Name has to be unique.
          </p>
          <div className={styles.inputRow}>
            {getSportNameInput()}
            <Button variant="success" type="submit">
              UPDATE
            </Button>
          </div>
        </form>
      );
    }

    if (mode === 'delete' && sportToEdit) {
      return (
        <>
          <p className={styles.info}>
            Do you really want to delete <b>{sportToEdit.name}</b>?{' '}
            <b>All related events will be removed too.</b>
          </p>
          <Button variant="error" onClick={() => deleteSport(sportToEdit._id)}>
            DELETE
          </Button>
        </>
      );
    }

    if (mode === 'add') {
      return (
        <form onSubmit={handleSubmit(handleAddSport)}>
          <p className={styles.info}>
            Add new sport discipline. <b>Name has to be unique.</b>
          </p>
          <div className={styles.inputRow}>
            {getSportNameInput()}
            <Button variant="success" type="submit">
              ADD
            </Button>
          </div>
        </form>
      );
    }

    return getSelectSportAlert();
  };

  return (
    <div className={styles.sportEditPanel}>
      {Builder.createResult(getCombinedStatus())
        .onSuccess(buildPanelOnSuccess())
        .onError(buildPanelOnError())
        .onIdle(buildPanelOnIdle())
        .build()}
    </div>
  );
};

export default SportEditPanel;
