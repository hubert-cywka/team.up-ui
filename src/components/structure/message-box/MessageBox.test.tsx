import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MessageBox from '@components/structure/message-box/MessageBox';
import { MessageBoxPageObjects } from '@components/structure/message-box/MessageBoxPageObjects';

const Component = new MessageBoxPageObjects();

const mockRouterBack = jest.fn();

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      back: mockRouterBack
    };
  }
}));

const buildComponent = async (onClick?: () => void, buttonText?: string) => {
  mockRouterBack.mockClear();
  Component.MOCK_ON_CLICK.mockClear();
  return render(
    <MessageBox
      message={Component.MOCK_MESSAGE}
      header={Component.MOCK_HEADER}
      icon={Component.MOCK_ICON}
      onButtonClick={onClick}
      buttonText={buttonText}
    />
  );
};

describe('Testing <SignInForm/> component', () => {
  describe('Testing layout', () => {
    beforeEach(async () => {
      await buildComponent();
    });

    test('should display message box', async () => {
      expect(await Component.messageBox).toBeVisible();
    });

    test('should display header with correct content', async () => {
      const header = await Component.header;
      expect(header).toBeVisible();
      expect(header).toHaveTextContent(Component.MOCK_HEADER);
    });

    test('should display message with correct content', async () => {
      const message = await Component.message;
      expect(message).toBeVisible();
      expect(message).toHaveTextContent(Component.MOCK_MESSAGE);
    });

    test('should display button with default content', async () => {
      const button = await Component.button;
      expect(button).toBeVisible();
      expect(button).toHaveTextContent('Go back');
    });
  });

  describe('Testing layout for custom variant', () => {
    test('should display button with default content', async () => {
      await buildComponent(Component.MOCK_ON_CLICK, Component.MOCK_BUTTON_TEXT);
      const button = await Component.button;
      expect(button).toBeVisible();
      expect(button).toHaveTextContent(Component.MOCK_BUTTON_TEXT);
    });
  });

  describe('Testing actions', () => {
    test('should router go back upon button click', async () => {
      await buildComponent();
      await Component.clickButton();
      expect(mockRouterBack).toHaveBeenCalled();
    });

    test('should trigger custom onClick if provided upon button click', async () => {
      await buildComponent(Component.MOCK_ON_CLICK, Component.MOCK_BUTTON_TEXT);
      await Component.clickButton();
      expect(Component.MOCK_ON_CLICK).toHaveBeenCalled();
    });
  });
});
