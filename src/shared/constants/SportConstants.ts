export class SportNameValidation {
  static MIN_LENGTH = 3;
  static MAX_LENGTH = 30;
  static IS_REQUIRED = 'Sport name is required.';
  static TOO_SHORT = `Sport name is too short. It should contain at least ${this.MIN_LENGTH} characters.`;
  static TOO_LONG = `Sport name is too long. It should contain up to ${this.MAX_LENGTH} characters.`;
  static INFO = `Sport name should have minimum ${this.MIN_LENGTH} characters, up to ${this.MAX_LENGTH}.`;
}
