import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faIcons } from '@fortawesome/free-solid-svg-icons';

export class MessageBoxPageObjects {
  public MOCK_HEADER = 'header';
  public MOCK_MESSAGE = 'message';
  public MOCK_ICON = faIcons;
  public MOCK_ON_CLICK = jest.fn();
  public MOCK_BUTTON_TEXT = 'button text';

  get messageBox() {
    return screen.findByTestId('message-box');
  }

  get header() {
    return screen.findByTestId('header');
  }

  get message() {
    return screen.findByTestId('message');
  }

  get button() {
    return screen.findByTestId('button');
  }

  clickButton = async () => {
    await userEvent.click(await this.button);
  };
}
