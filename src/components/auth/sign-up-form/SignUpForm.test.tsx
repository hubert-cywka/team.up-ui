import '@testing-library/jest-dom';
import { SignUpFormPageObjects } from './SignUpFormPageObjects';
import { render } from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { SignUpRequest } from 'shared/types/Auth';
import {
  BirthdayValidation,
  EmailValidation,
  PasswordValidation,
  UsernameValidation
} from '@shared/constants/UserConstants';

const Component = new SignUpFormPageObjects();
const mockOnSubmit = jest.fn();

// eslint-disable-next-line no-unused-vars
const buildComponent = async (onSubmit: (request: SignUpRequest) => void) => {
  return render(<SignUpForm onSubmit={onSubmit} />);
};

describe('Testing <SignUpForm/> component', () => {
  beforeEach(async () => {
    mockOnSubmit.mockClear();
    await buildComponent(mockOnSubmit);
  });

  describe('Testing layout', () => {
    test('should display name input', async () => {
      expect(await Component.nameInput).toBeVisible();
    });

    test('should display name input label', async () => {
      const nameInputLabel = await Component.nameInputLabel;
      expect(nameInputLabel).toBeVisible();
      expect(nameInputLabel).toHaveTextContent(UsernameValidation.INFO);
    });

    test('should display email input', async () => {
      expect(await Component.emailInput).toBeVisible();
    });

    test('should display email input label', async () => {
      const emailInputLabel = await Component.emailInputLabel;
      expect(emailInputLabel).toBeVisible();
      expect(emailInputLabel).toHaveTextContent(EmailValidation.INFO);
    });

    test('should display birthdate input', async () => {
      expect(await Component.birthdayInput).toBeVisible();
    });

    test('should display birthdate input label', async () => {
      const birthdayInputLabel = await Component.birthdayInputLabel;
      expect(birthdayInputLabel).toBeVisible();
      expect(birthdayInputLabel).toHaveTextContent(BirthdayValidation.INFO);
    });

    test('should display password inputs', async () => {
      expect(await Component.passwordInput).toBeVisible();
    });

    test('should display password input label', async () => {
      const passwordInputLabel = await Component.passwordInputLabel;
      expect(passwordInputLabel).toBeVisible();
      expect(passwordInputLabel).toHaveTextContent(PasswordValidation.INFO);
    });

    test('should display confirm password inputs', async () => {
      expect(await Component.confirmPasswordInput).toBeVisible();
    });

    test('should display confirm password input label', async () => {
      const confirmPasswordInputLabel = await Component.confirmPasswordInputLabel;
      expect(confirmPasswordInputLabel).toBeVisible();
      expect(confirmPasswordInputLabel).toHaveTextContent(PasswordValidation.CONFIRM_INFO);
    });

    test('should not display passwords', async () => {
      expect(await Component.isPasswordHidden).toBeTruthy();
      expect(await Component.isConfirmPasswordHidden).toBeTruthy();
    });

    test('should display sign in link', async () => {
      expect(await Component.signInLink).toBeVisible();
    });

    test('should display sign up button', async () => {
      expect(await Component.signUpButton).toBeVisible();
    });
  });

  describe('Testing actions', () => {
    test('should allow to type username', async () => {
      await Component.typeUsername(Component.MOCK_USERNAME);
      expect(await Component.nameInput).toHaveValue(Component.MOCK_USERNAME);
    });

    test('should allow to type email', async () => {
      await Component.typeEmail(Component.MOCK_EMAIL);
      expect(await Component.emailInput).toHaveValue(Component.MOCK_EMAIL);
    });

    test('should allow to type password', async () => {
      await Component.typePassword(Component.MOCK_PASSWORD);
      expect(await Component.passwordInput).toHaveValue(Component.MOCK_PASSWORD);
    });

    test('should allow to confirm password', async () => {
      await Component.typeConfirmPassword(Component.MOCK_PASSWORD);
      expect(await Component.confirmPasswordInput).toHaveValue(Component.MOCK_PASSWORD);
    });

    test('should allow to type birthdate', async () => {
      await Component.typeBirthDate(Component.MOCK_BIRTHDATE);
      expect(await Component.birthdayInput).toHaveValue(Component.MOCK_BIRTHDATE);
    });

    test('should allow to submit form when provided data is correct', async () => {
      await Component.fillForm();
      await Component.signUp();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe('Testing form validation', () => {
    test('should display error if username is not provided', async () => {
      await Component.typeUsername(Component.MOCK_USERNAME);
      await Component.clearUsername();
      expect(await Component.nameInputLabel).toHaveTextContent(UsernameValidation.IS_REQUIRED);
    });

    test('should display error if username is too long', async () => {
      const tooLongUsername = 'a'.repeat(UsernameValidation.MAX_LENGTH + 1);
      await Component.typeUsername(tooLongUsername);
      expect(await Component.nameInputLabel).toHaveTextContent(UsernameValidation.TOO_LONG);
    });

    test('should display error if username is too short', async () => {
      const tooShortUsername = 'a'.repeat(UsernameValidation.MIN_LENGTH - 1);
      await Component.typeUsername(tooShortUsername);
      expect(await Component.nameInputLabel).toHaveTextContent(UsernameValidation.TOO_SHORT);
    });

    test('should display error if email is not provided', async () => {
      await Component.typeEmail(Component.MOCK_EMAIL);
      await Component.clearEmail();
      expect(await Component.emailInputLabel).toHaveTextContent(EmailValidation.IS_REQUIRED);
    });

    test('should display error if email is in wrong format', async () => {
      await Component.typeEmail('wrong@email.');
      expect(await Component.emailInputLabel).toHaveTextContent(EmailValidation.WRONG_FORMAT);
    });

    test('should display error if password is not provided', async () => {
      await Component.typePassword(Component.MOCK_PASSWORD);
      await Component.clearPassword();
      expect(await Component.passwordInputLabel).toHaveTextContent(PasswordValidation.IS_REQUIRED);
    });

    test('should display error if password is too short', async () => {
      const tooShortPassword = 'a'.repeat(PasswordValidation.MIN_LENGTH - 1);
      await Component.typePassword(tooShortPassword);
      expect(await Component.passwordInputLabel).toHaveTextContent(PasswordValidation.TOO_SHORT);
    });

    test('should display error if password is too long', async () => {
      const tooLongPassword = 'a'.repeat(PasswordValidation.MAX_LENGTH + 1);
      await Component.typePassword(tooLongPassword);
      expect(await Component.passwordInputLabel).toHaveTextContent(PasswordValidation.TOO_LONG);
    });

    test('should display error if confirm password is not provided', async () => {
      await Component.typeConfirmPassword(Component.MOCK_PASSWORD);
      await Component.clearConfirmPassword();
      expect(await Component.confirmPasswordInputLabel).toHaveTextContent(
        PasswordValidation.NEEDS_TO_BE_CONFIRMED
      );
    });

    test('should display error when passwords do not match', async () => {
      await Component.typeConfirmPassword(Component.MOCK_PASSWORD);
      expect(await Component.confirmPasswordInputLabel).toHaveTextContent(
        PasswordValidation.PASSWORDS_MISMATCH
      );
    });

    test('should display error if birthdate is not provided', async () => {
      await Component.typeBirthDate(Component.MOCK_BIRTHDATE);
      await Component.clearBirthDate();
      expect(await Component.birthdayInputLabel).toHaveTextContent(BirthdayValidation.IS_REQUIRED);
    });

    test('should display error if birthdate is too recent', async () => {
      await Component.typeBirthDate('2023-01-01');
      expect(await Component.birthdayInputLabel).toHaveTextContent(BirthdayValidation.TOO_YOUNG);
    });

    test('should not allow to submit form if wrong data is provided', async () => {
      await Component.signUp();
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });
});
