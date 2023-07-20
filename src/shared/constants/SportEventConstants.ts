export class SportEventDescriptionValidation {
  static MAX_LENGTH = 512;
  static IS_REQUIRED = 'Event description is required.';
  static TOO_LONG = `It should contain up to ${this.MAX_LENGTH} characters.`;
  static INFO = `Up to ${this.MAX_LENGTH} characters.`;
}

export class SportEventDateValidation {
  static IS_REQUIRED = 'Start date is required.';
  static INFO = `Can't select date from the past.`;
}

export class SportEventPlayersNumberValidation {
  static IS_REQUIRED = 'Number of players is required.';
  static MIN_PARTICIPANTS = 2;
  static MAX_PARTICIPANTS = 1000;
  static MIN_TOO_LOW = `Lower threshold must be at least ${this.MIN_PARTICIPANTS}.`;
  static MIN_TOO_HIGH = `Lower threshold must be lower than maximum number.`;
  static MAX_TOO_HIGH = `Upper threshold must not be higher than ${this.MAX_PARTICIPANTS}.`;
  static MAX_TOO_LOW = `Upper threshold must be higher than minimum number.`;
  static INFO = `Must be between ${this.MIN_PARTICIPANTS} and ${this.MAX_PARTICIPANTS}`;
}

export class SportEventDisciplineValidation {
  static INFO = 'Select only one.';
  static IS_REQUIRED = 'You have to select one sport discipline.';
}

export class SportEventLocationValidation {
  static INFO = 'Select a place, where all participants should meet.';
  static IS_REQUIRED = 'You have to select location from map.';
}
