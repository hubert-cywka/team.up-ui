export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 50;

export class PasswordValidation {
  static MIN_PASSWORD_LENGTH = 8;
  static MAX_PASSWORD_LENGTH = 50;
  static PASSWORD_IS_REQUIRED = 'Password is required.';
  static PASSWORD_TOO_SHORT = 'Password is too short.';
  static PASSWORD_TOO_LONG = 'Password is too long.';
}

export class UsernameValidation {
  static MIN_USERNAME_LENGTH = 3;
  static MAX_USERNAME_LENGTH = 50;
  static USERNAME_IS_REQUIRED = 'Username is required.';
  static USERNAME_TOO_SHORT = 'Username is too short.';
  static USERNAME_TOO_LONG = 'Username is too long.';
}

export class EmailValidation {
  static EMAIL_IS_REQUIRED = 'Email is required.';
  static WRONG_FORMAT = 'Invalid email format.';
}
