import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SportDiscipline } from '@shared/types/Sport';

export class SportsListPageObjects {
  public MOCK_SPORTS: SportDiscipline[] = [
    { name: 'Football', _id: '1' },
    { name: 'Boxing', _id: '2' },
    { name: 'Running', _id: '3' }
  ];

  findSportByName = async (name: string): Promise<Element> => {
    return await screen.findByText(name);
  };

  selectSportByName = async (name: string) => {
    await userEvent.click(await this.findSportByName(name));
  };

  get noSportsToShowMessage(): Promise<Element> {
    return screen.findByText('No sport disciplines to show.');
  }

  get sportsList(): Promise<Element> {
    return screen.findByTestId('sports-list');
  }

  get sportTiles(): Promise<Element[] | HTMLCollection> {
    return this.sportsList.then((list) => list.children);
  }
}
