import Alert from '@components/primitives/alert/Alert';
import Button from '@components/primitives/button/Button';
import { useDeleteSportDiscipline } from '@shared/hooks/sport/useDeleteSportDiscipline';
import styles from '../SportPanelTabsShared.module.scss';
import Builder from '@shared/utility/Builder';
import { AxiosError } from 'axios';
import { SportDiscipline } from '@shared/types/Sport';

interface SportDeleteTabProps {
  sportToDelete: SportDiscipline | null;
  onSuccess: () => void;
}

const SportDeleteTab = ({ sportToDelete, onSuccess }: SportDeleteTabProps) => {
  const {
    mutateAsync: deleteSport,
    status: deleteStatus,
    reset: resetDelete,
    error: deleteError
  } = useDeleteSportDiscipline({ onSuccess: onSuccess });

  const buildErrorMessage = (error: AxiosError) => {
    if (!error?.response?.status) return '';
    const errorMessage = 'Failed to delete sport.';

    const reason = (() => {
      switch (error.response.status) {
        case 401:
          return 'User is not authorized.';

        case 403:
          return 'This action is forbidden.';

        case 404:
          return 'Sport not found. Someone could deleted it earlier.';

        default:
          return 'Unexpected server error happened.';
      }
    })();

    return errorMessage.concat(' ', reason);
  };

  return (
    <div className={styles.sportEditTab}>
      {Builder.createResult(deleteStatus)
        .onSuccess(
          <>
            <Alert message="Sport discipline deleted" variant="success" />
            <Button variant="success" onClick={resetDelete}>
              OK
            </Button>
          </>
        )
        .onError(
          <>
            <Alert message={buildErrorMessage(deleteError as AxiosError)} variant="error" />
            <Button variant="error" onClick={resetDelete}>
              OK
            </Button>
          </>
        )
        .onIdle(
          sportToDelete ? (
            <>
              <p className={styles.info}>
                Do you really want to delete <b>{sportToDelete.name}</b>?{' '}
                <b>All related events will be removed too.</b>
              </p>
              <Button variant="error" onClick={() => deleteSport(sportToDelete._id)}>
                DELETE
              </Button>
            </>
          ) : (
            <Alert message="Select sport discipline you want to delete." />
          )
        )
        .build()}
    </div>
  );
};

export default SportDeleteTab;
