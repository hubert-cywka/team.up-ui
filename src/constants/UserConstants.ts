export class PasswordValidation {
  static MIN_LENGTH = 8;
  static MAX_LENGTH = 50;
  static IS_REQUIRED = 'Password is required.';
  static NEEDS_TO_BE_CONFIRMED = 'You have to confirm password.';
  static PASSWORDS_MISMATCH = 'Passwords do not match.';
  static TOO_SHORT = 'Password is too short.';
  static TOO_LONG = 'Password is too long.';
  static INFO = `Password should have minimum ${this.MIN_LENGTH} characters, up to ${this.MAX_LENGTH}.`;
  static CONFIRM_INFO = `Enter your password once again.`;
}

export class UsernameValidation {
  static MIN_LENGTH = 3;
  static MAX_LENGTH = 50;
  static IS_REQUIRED = 'Username is required.';
  static TOO_SHORT = 'Username is too short.';
  static TOO_LONG = 'Username is too long.';
  static INFO = `Username should have minimum ${this.MIN_LENGTH} characters, up to ${this.MAX_LENGTH}.`;
}

export class EmailValidation {
  static IS_REQUIRED = 'Email is required.';
  static WRONG_FORMAT = 'Invalid email format.';
  static INFO = `Email has to be in valid format.`;
}

export class BirthdayValidation {
  static IS_REQUIRED = 'Birthday date is required.';
  static INFO = `You need to be at least 12 years old.`;
}
