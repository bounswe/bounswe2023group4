const errorCodes = {
  // General errors
  GENERIC_ERROR: {
    code: 1000,
    message: 'An unexpected error occurred.',
  },

  INTERNAL_SERVER_ERROR: {
    code: 1001,
    message: "Something went wrong",
  },

  ACCESS_TOKEN_INVALID_ERROR: {
    code: 1002,
    message: 'The access token is invalid.',
  },

  REFRESH_TOKEN_INVALID_ERROR: {
    code: 1003,
    message: 'The refresh token is invalid.',
  },

  ACCESS_TOKEN_NEEDED_ERROR: {
    code: 1004,
    message: 'An access token is needed',
  },

  REFRESH_TOKEN_NEEDED_ERROR: {
    code: 1005,
    message: 'A refresh token is needed',
  },

  REGISTRATION_FAILED: {
    code: 1006,
    message: 'Registration failed'
  },

  INSUFFICIENT_DATA: {
    code: 1007,
    message: 'Given data is not sufficient. Please follow guidelines.'
  },

  USER_NOT_FOUND: {
    code: 2000,
    message: 'User not found.',
  },

  USER_NOT_FOUND_WITH_USERID: {
    code: 2001,
    message: 'User with the given user id not found.',
  },

  USER_NOT_FOUND_WITH_USERNAME: {
    code: 2002,
    message: 'User with the given username not found.',
  },

  USER_NOT_FOUND_WITH_EMAIL: {
    code: 2003,
    message: 'User with the given email not found.',
  },

  USERNAME_ALREADY_EXISTS: {
    code: 2004,
    message: 'Username is taken',
  },

  EMAIL_ALREADY_EXISTS: {
    code: 2005,
    message: 'Email is already in use',
  },

  WRONG_PASSWORD: {
    code: 2006,
    message: 'Password is wrong',
  },

  INVALID_EMAIL: {
    code: 2007,
    message: 'Email does not meet required criteria',
  },

  INVALID_DATE: {
    code: 2008,
    message: 'Date does not meet required criteria',
  },

  INVALID_PASSWORD: {
    code: 2009,
    message: 'Password does not meet required criteria',
  },

  GOOGLE_LOGIN_FAILED: {
    code: 2100,
    message: 'Google authentication failed',
  },

  GOOGLE_LOGIN_BODY_EMPTY: {
    code: 2101,
    message: 'Google login requires code or googleId',
  },

  GOOGLE_LOGIN_INVALID_GOOGLE_CODE: {
    code: 2102,
    message: 'Given google code is not valid',
  },

  GOOGLE_LOGIN_INVALID_GOOGLE_ID: {
    code: 2103,
    message: 'Given google id is not valid',
  },

  GOOGLE_LOGIN_NONVERIFIED_GOOGLE_ACCOUNT: {
    code: 2104,
    message: 'Google account is not verified',
  },

  PROFILE_NOT_FOUND: {
    code: 3000,
    message: 'Profile not found.',
  },

  USER_ALREADY_HAS_PROFILE: {
    code: 3001,
    message: 'User already has profile',
  },

  PROFILE_COULD_NOT_BE_CREATED: {
    code: 3002,
    message: 'Profile could not be created.',
  },

  PROFILE_COULD_NOT_BE_UPDATED: {
    code: 3003,
    message: 'Profile could not be updated.',
  },

  DATABASE_ERROR: {
    code: 3004,
    message: 'Error while accessing the database.',
  },

  NO_SUCH_POLL_ERROR: {
    code: 3005,
    message: 'No such poll found.'
  },

  INSUFFICIENT_POINTS_ERROR: {
    code: 3006,
    message: 'User does not have enough points'
  },

  USER_MUST_GIVE_POINTS_ERROR: {
    code: 3007,
    message: 'User has to put points to be able to vote polls'
  },

  USER_DOES_NOT_HAVE_GIVEN_BADGE: {
    code: 3008,
    message: 'User does not have a badge with the given badge Id'
  },

  BAD_DISCRETE_POLL_REQUEST_ERROR: {
    code: 4000,
    message: 'Bad request body for creating a discrete poll.'
  },
  
  BAD_CONT_POLL_REQUEST_ERROR: {
    code: 4001,
    message: 'Bad request body for creating a continuous poll.'
  },

  MINMAX_BAD_CONT_POLL_REQUEST_ERROR: {
    code: 4002,
    message: 'Minimum value allowed was higher than maximum value allowed in the poll.'
  },

  NO_FOLLOWERSHIP_FOUND:{
    code: 4003,
    message: 'Those two users do not follow each other!'
  },

  FOLLOWERSHIP_NOT_ADDED:{
    code: 4004,
    message: 'Those two users could not follow each other!'
  },
  
  FOLLOWERSHIP_ALREADY_EXISTS:{
    code: 4005,
    message: 'Those two users already follow each other'
  },

  CHOICE_DOES_NOT_EXIST_ERROR: {
    code: 5000,
    message: 'Choice for the poll does not exist.'
  },

  CHOICE_OUT_OF_BOUNDS_ERROR: {
    code: 5001,
    message: 'Choice for the poll is out of given bounds.'
  },

  USER_IS_NOT_MODERATOR: {
    code: 8000,
    message: 'User is not authorized to execute this moderator activity'
  },

  REPORT_REQUEST_INVALID_BODY: {
    code: 8001,
    message: 'Report type moderator request should contain requestId and banPoll in body'
  },

  DISCRETE_POLL_REQUEST_INVALID_BODY:{
    code: 8002,
    message: 'Discrete poll type moderator request should contain requestId and choice in body'
  },

  CONTINUOUS_POLL_REQUEST_INVALID_BODY:{
    code: 8003,
    message: 'Continuous poll type moderator request should contain requestId and choice in body'
  },

  MOD_REQUEST_SHOWS_INVALID_POLL:{
    code: 8004,
    message: 'Given moderator request does not show a valid poll'
  },

  REQUEST_HAS_INVALID_TYPE:{
    code: 8005,
    message: 'Given request is corrupted and server could not handle it'
  },

  // Add more error codes as needed
};

module.exports = errorCodes;