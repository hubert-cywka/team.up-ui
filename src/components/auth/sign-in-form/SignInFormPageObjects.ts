import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export class SignInFormPageObjects {
  public MOCK_EMAIL = 'mock_email@email.com';
  public MOCK_PASSWORD = 'password';

  get passwordInput(): Promise<HTMLInputElement> {
    return screen.findByTestId('password-input');
  }

  get isPasswordHidden() {
    return this.passwordInput.then((input) => input.type === 'password');
  }

  get emailInput(): Promise<HTMLInputElement> {
    return screen.findByTestId('email-input');
  }

  get signUpLink(): Promise<Element> {
    return screen.findByTestId('sign-up-link');
  }

  get signInButton(): Promise<Element> {
    return screen.findByTestId('sign-in-button');
  }

  goToSignUpPage = async () => {
    await userEvent.click(await this.signUpLink);
  };

  signIn = async () => {
    await userEvent.click(await this.signInButton);
  };

  typeEmail = async (email: string) => {
    await userEvent.type(await this.emailInput, email);
  };

  typePassword = async (password: string) => {
    await userEvent.type(await this.passwordInput, password);
  };

  fillForm = async () => {
    await this.typeEmail(this.MOCK_EMAIL);
    await this.typePassword(this.MOCK_PASSWORD);
  };
}
