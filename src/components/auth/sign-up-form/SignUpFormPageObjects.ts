import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export class SignUpFormPageObjects {
  public MOCK_USERNAME = 'mock_username';
  public MOCK_EMAIL = 'mock_email@email.com';
  public MOCK_PASSWORD = 'password';
  public MOCK_BIRTHDATE = '2000-10-10';

  get passwordInput(): Promise<HTMLInputElement> {
    return screen.findByTestId('password-input');
  }

  get confirmPasswordInput(): Promise<HTMLInputElement> {
    return screen.findByTestId('confirmPassword-input');
  }

  get isPasswordHidden() {
    return this.passwordInput.then((input) => input.type === 'password');
  }

  get isConfirmPasswordHidden() {
    return this.confirmPasswordInput.then((input) => input.type === 'password');
  }

  get emailInput(): Promise<HTMLInputElement> {
    return screen.findByTestId('email-input');
  }

  get nameInput(): Promise<HTMLInputElement> {
    return screen.findByTestId('name-input');
  }

  get birthdayInput(): Promise<HTMLInputElement> {
    return screen.findByTestId('birthday-input');
  }

  get passwordInputLabel(): Promise<Element> {
    return screen.findByTestId('password-label');
  }

  get confirmPasswordInputLabel(): Promise<Element> {
    return screen.findByTestId('confirmPassword-label');
  }

  get emailInputLabel(): Promise<Element> {
    return screen.findByTestId('email-label');
  }

  get nameInputLabel(): Promise<Element> {
    return screen.findByTestId('name-label');
  }

  get birthdayInputLabel(): Promise<Element> {
    return screen.findByTestId('birthday-label');
  }

  get signInLink(): Promise<Element> {
    return screen.findByTestId('sign-in-link');
  }

  get signUpButton(): Promise<Element> {
    return screen.findByTestId('sign-up-button');
  }

  goToSignIn = async () => {
    await userEvent.click(await this.signInLink);
  };

  signUp = async () => {
    await userEvent.click(await this.signUpButton);
  };

  typeUsername = async (username: string) => {
    await userEvent.type(await this.nameInput, username);
  };

  typeEmail = async (email: string) => {
    await userEvent.type(await this.emailInput, email);
  };

  typePassword = async (password: string) => {
    await userEvent.type(await this.passwordInput, password);
  };

  typeConfirmPassword = async (confirmPassword: string) => {
    await userEvent.type(await this.confirmPasswordInput, confirmPassword);
  };

  typeBirthDate = async (birthdate: string) => {
    await userEvent.type(await this.birthdayInput, birthdate);
  };

  clearUsername = async () => {
    await userEvent.clear(await this.nameInput);
  };

  clearEmail = async () => {
    await userEvent.clear(await this.emailInput);
  };

  clearPassword = async () => {
    await userEvent.clear(await this.passwordInput);
  };

  clearConfirmPassword = async () => {
    await userEvent.clear(await this.confirmPasswordInput);
  };

  clearBirthDate = async () => {
    await userEvent.clear(await this.birthdayInput);
  };

  fillForm = async () => {
    await this.typeEmail(this.MOCK_EMAIL);
    await this.typeUsername(this.MOCK_USERNAME);
    await this.typeBirthDate(this.MOCK_BIRTHDATE);
    await this.typeConfirmPassword(this.MOCK_PASSWORD);
    await this.typePassword(this.MOCK_PASSWORD);
  };
}
