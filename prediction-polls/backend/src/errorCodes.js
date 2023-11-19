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

  REFRESH_TOKEN_NEEDED_ERROR: {
    code: 1003,
    message: 'A refresh token is needed',
  },

  REGISTRATION_FAILED: {
    code: 1004,
    message: 'Registration failed'
  },

  ACCESS_TOKEN_NULL: {
    code: 1005,
    message: 'The access token is null.',
  },

  USER_NOT_FOUND: {
    code: 2000,
    message: 'User not found.',
  },

  INVALID_CREDENTIALS: {
    code: 2001,
    message: 'Invalid username or password.',
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
    message: 'Request body for creating a discrete poll was bad.'
  },
  
  BAD_CONT_POLL_REQUEST_ERROR: {
    code: 4001,
    message: 'Request body for creating a continuous poll was bad.'
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