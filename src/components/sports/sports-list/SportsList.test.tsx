import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SportsListPageObjects } from '@components/sports/sports-list/SportsListPageObjects';
import SportsList from '@components/sports/sports-list/SportsList';
import { SportDiscipline } from '@shared/types/Sport';

const Component = new SportsListPageObjects();
const mockOnChange = jest.fn();

const buildComponent = async (
  selectedSport: SportDiscipline | null,
  availableSports: SportDiscipline[],
  onChange: (sport: SportDiscipline | null) => void // eslint-disable-line no-unused-vars
) => {
  return render(
    <SportsList
      availableSports={availableSports}
      selectedSport={selectedSport}
      onChange={onChange}
    />
  );
};

describe('Testing <SignInForm/> component', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  describe('Testing layout', () => {
    beforeEach(async () => {
      await buildComponent(null, Component.MOCK_SPORTS, mockOnChange);
    });

    test('should display list of sports', async () => {
      expect(await Component.sportsList).toBeVisible();
    });

    test('should display correct amount of sport tiles', async () => {
      expect((await Component.sportTiles).length).toBe(Component.MOCK_SPORTS.length);
    });

    test('should display sport tiles with correct names', async () => {
      await Promise.all(
        Component.MOCK_SPORTS.map(async (sport) =>
          expect(await Component.findSportByName(sport.name)).toBeVisible()
        )
      );
    });
  });

  describe('Testing actions', () => {
    test('should allow to select sport tile', async () => {
      await buildComponent(null, Component.MOCK_SPORTS, mockOnChange);
      await Component.selectSportByName(Component.MOCK_SPORTS[0].name);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    test('should allow to unselect sport tile', async () => {
      const alreadySelectedSport = Component.MOCK_SPORTS[0];
      await buildComponent(alreadySelectedSport, Component.MOCK_SPORTS, mockOnChange);
      await Component.selectSportByName(alreadySelectedSport.name);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing error handling', () => {
    test('should display error message if no sports are available', async () => {
      await buildComponent(null, [], mockOnChange);
      expect(await Component.noSportsToShowMessage).toBeVisible();
    });
  });
});
