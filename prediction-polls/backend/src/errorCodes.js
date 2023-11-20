const errorCodes = {
  // General errors
  GENERIC_ERROR: {
    code: 1000,
    message: 'An unexpected error occurred.',
  },

  ACCESS_TOKEN_INVALID_ERROR: {
    code: 1001,
    message: 'The access token is invalid.',
  },

  REFRESH_TOKEN_INVALID_ERROR: {
    code: 1002,
    message: 'The refresh token is invalid.',
  },

  ACCESS_TOKEN_NEEDED_ERROR: {
    code: 1003,
    message: 'A access token is needed',
  },

  REFRESH_TOKEN_NEEDED_ERROR: {
    code: 1004,
    message: 'A refresh token is needed',
  },

  REGISTRATION_FAILED: {
    code: 1005,
    message: 'Registration failed'
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
    code: 3000,
    message: 'Error while accessing the database.',
  },

  NO_SUCH_POLL_ERROR: {
    code: 3001,
    message: 'No such poll found.'
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

  CHOICE_DOES_NOT_EXIST_ERROR: {
    code: 5000,
    message: 'Choice for the poll does not exist.'
  },

  CHOICE_OUT_OF_BOUNDS_ERROR: {
    code: 5001,
    message: 'Choice for the poll is out of given bounds.'
  }

  // Add more error codes as needed
};

module.exports = errorCodes;