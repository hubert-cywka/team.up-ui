import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SignInRequest } from 'shared/types/Auth';
import { SignInFormPageObjects } from '@components/auth/sign-in-form/SignInFormPageObjects';
import SignInForm from '@components/auth/sign-in-form/SignInForm';

const Component = new SignInFormPageObjects();
const mockOnSubmit = jest.fn();

// eslint-disable-next-line no-unused-vars
const buildComponent = async (onSubmit: (request: SignInRequest) => void) => {
  return render(<SignInForm onSubmit={onSubmit} />);
};

describe('Testing <SignInForm/> component', () => {
  beforeEach(async () => {
    mockOnSubmit.mockClear();
    await buildComponent(mockOnSubmit);
  });

  describe('Testing layout', () => {
    test('should display email input', async () => {
      expect(await Component.emailInput).toBeVisible();
    });

    test('should display password input', async () => {
      expect(await Component.passwordInput).toBeVisible();
    });

    test('should not display password', async () => {
      expect(await Component.isPasswordHidden).toBeTruthy();
    });

    test('should display sign up link', async () => {
      expect(await Component.signUpLink).toBeVisible();
    });

    test('should display sign in button', async () => {
      expect(await Component.signInButton).toBeVisible();
    });
  });

  describe('Testing actions', () => {
    test('should allow to type email', async () => {
      await Component.typeEmail(Component.MOCK_EMAIL);
      expect(await Component.emailInput).toHaveValue(Component.MOCK_EMAIL);
    });

    test('should allow to type password', async () => {
      await Component.typePassword(Component.MOCK_PASSWORD);
      expect(await Component.passwordInput).toHaveValue(Component.MOCK_PASSWORD);
    });

    test('should allow to submit form when provided data is correct', async () => {
      await Component.fillForm();
      await Component.signIn();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe('Testing form validation', () => {
    test('should allow to submit form even if wrong data is provided, for security reasons', async () => {
      await Component.signIn();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
