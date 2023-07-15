export module Route {
  export const HOME = '/';
  export const ACTIVITIES = '/activities';
  export const ACTIVITIES_ADD = `${ACTIVITIES}/add`;

  const AUTH = '/auth';
  export const SIGN_IN = `${AUTH}/sign-in`;
  export const SIGN_UP = `${AUTH}/sign-up`;
  export const SIGN_OUT = `${AUTH}/sign-out`;

  export const ACCOUNT = '/account';
}
