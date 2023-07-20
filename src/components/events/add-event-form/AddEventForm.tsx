import { Controller, useForm } from 'react-hook-form';
import TimePicker from 'components/events/add-event-form/time-picker/TimePicker';
import LocationPicker from 'components/events/add-event-form/location-picker/LocationPicker';
import styles from './AddEventForm.module.scss';
import Input from 'components/primitives/input/Input';
import { GeoPosition } from 'shared/types/Other';
import { useSportDisciplines } from 'shared/hooks/sport/useSportDisciplines';
import Builder from 'shared/utility/Builder';
import MessageBox from 'components/structure/message-box/MessageBox';
import { faGreaterThanEqual, faLessThanEqual, faXmark } from '@fortawesome/free-solid-svg-icons';
import SportsList from 'components/sports/sports-list/SportsList';
import TextArea from 'components/primitives/text-area/TextArea';
import Button from 'components/primitives/button/Button';
import InputLabel from 'components/primitives/input-label/InputLabel';
import { CreateSportEventRequestWithDisciplineId } from 'shared/types/Events';
import classNames from 'classnames';
import {
  SportEventDateValidation,
  SportEventDescriptionValidation,
  SportEventDisciplineValidation,
  SportEventLocationValidation,
  SportEventPlayersNumberValidation
} from 'shared/constants/SportEventConstants';
import { yupResolver } from '@hookform/resolvers/yup';
import { addSportEventValidationSchema } from 'shared/constants/FormSchemas';
import { SportDiscipline } from 'shared/types/Sport';

interface AddEventFormProps {
  onSubmit: (requestWithDisciplineId: CreateSportEventRequestWithDisciplineId) => void; // eslint-disable-line no-unused-vars
  disabled?: boolean;
}

type AddEventInputs = {
  minPlayers: number;
  maxPlayers: number;
  description: string;
  startDate: Date | null;
  sportDiscipline: SportDiscipline | null;
  location: GeoPosition | null;
};

const AddEventForm = ({ onSubmit, disabled }: AddEventFormProps) => {
  const sportsQuery = useSportDisciplines();
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors }
  } = useForm<AddEventInputs>({
    mode: 'onChange',
    resolver: yupResolver(addSportEventValidationSchema)
  });

  const handleAddEvent = () => {
    const startDate = getValues('startDate');
    const selectedSport = getValues('sportDiscipline');
    const markerPosition = getValues('location');
    if (!markerPosition || !selectedSport || !startDate) return;
    onSubmit({
      description: getValues('description'),
      maxPlayers: getValues('maxPlayers'),
      minPlayers: getValues('minPlayers'),
      location: markerPosition,
      startDate: startDate.toISOString(),
      sportDisciplineId: selectedSport._id
    });
  };

  return Builder.createResult(sportsQuery.status)
    .onSuccess(
      <form onSubmit={handleSubmit(handleAddEvent)} className={styles.addEventForm}>
        <section className={styles.formSection}>
          <InputLabel
            text="Event location."
            subtext={SportEventLocationValidation.INFO}
            errorMessage={errors.location?.message}
          />
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <LocationPicker
                className={styles.map}
                selected={field.value}
                onChange={(location) => field.onChange(location)}
              />
            )}
          />
        </section>
        <section className={styles.formSection}>
          {sportsQuery.data && (
            <>
              <InputLabel
                text="Sport discipline."
                subtext={SportEventDisciplineValidation.INFO}
                errorMessage={errors.sportDiscipline?.message}
              />
              <Controller
                control={control}
                name="sportDiscipline"
                render={({ field }) => (
                  <SportsList
                    className={styles.sportsList}
                    onChange={(sport) => field.onChange(sport)}
                    selectedSport={field.value}
                    availableSports={sportsQuery.data}
                  />
                )}
              />
            </>
          )}

          <InputLabel
            text="Description, rules, details."
            subtext={SportEventDescriptionValidation.INFO}
            errorMessage={errors.description?.message}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextArea
                className={styles.input}
                value={field.value}
                onChange={(e) => field.onChange(e)}
              />
            )}
          />

          <InputLabel
            text="Number of participants."
            subtext={SportEventPlayersNumberValidation.INFO}
            errorMessage={errors.minPlayers?.message ?? errors.maxPlayers?.message ?? ''}
          />
          <div className={styles.inputRow}>
            <Input
              type="number"
              icon={faGreaterThanEqual}
              iconClassName={styles.inputIcon}
              className={classNames(styles.numberInput, styles.input)}
              defaultValue={SportEventPlayersNumberValidation.MIN_PARTICIPANTS}
              {...register('minPlayers', { valueAsNumber: true })}
            />
            <Input
              type="number"
              icon={faLessThanEqual}
              iconClassName={styles.inputIcon}
              className={classNames(styles.numberInput, styles.input)}
              defaultValue={SportEventPlayersNumberValidation.MAX_PARTICIPANTS}
              {...register('maxPlayers', { valueAsNumber: true })}
            />
          </div>

          <InputLabel
            text="Start date and time."
            subtext={SportEventDateValidation.INFO}
            errorMessage={errors.startDate?.message}
          />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TimePicker
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                iconClassName={styles.inputIcon}
                className={styles.input}
              />
            )}
          />

          <Button
            disabled={disabled}
            variant="success"
            type="submit"
            className={styles.submitButton}>
            Submit
          </Button>
        </section>
      </form>
    )
    .onError(
      <MessageBox
        icon={faXmark}
        header="No data"
        message="Failed to download necessary data. Form cannot be displayed right now, sorry."
        buttonText="Retry"
        onButtonClick={sportsQuery.refetch}
      />
    )
    .build();
};

export default AddEventForm;
