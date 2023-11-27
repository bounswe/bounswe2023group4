const {
  signup,
  createAccessTokenFromRefreshToken,
  logIn,
  logOut,
  authorizeAccessToken,
  generateAccessToken,
  generateRefreshToken,
} = require('../src/services/AuthorizationService');
const authDb = require('../src/repositories/AuthorizationDB');
const profileDb = require('../src/repositories/ProfileDB');
const jwt = require('jsonwebtoken');
const errorCodes = require('../src/errorCodes');

jest.mock('../src/repositories/AuthorizationDB');
jest.mock('../src/repositories/ProfileDB');
jest.mock('jsonwebtoken');

describe('signup()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: 'testUser',
        password: 'TestPassword1.',
        email: 'test@example.com',
        birthday: '1990-01-01',
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should successfully sign up a new user', async () => {
    authDb.isUsernameOrEmailInUse.mockResolvedValueOnce({
      usernameInUse: false,
      emailInUse: false,
    });
    authDb.addUser.mockResolvedValueOnce({ userId: 1 });
    profileDb.addProfile.mockResolvedValueOnce({profileId:1})

    await signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ status: 'success' });
  });

});

describe('createAccessTokenFromRefreshToken()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        refreshToken: 'testRefreshToken',
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should create access token from refresh token', async () => {
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, { name: 'testUser', id: 1 });
    });
    jwt.sign.mockReturnValueOnce('testAccessToken');

    await createAccessTokenFromRefreshToken(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ accessToken: 'testAccessToken' });
  });

});

describe('logIn()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: 'testUser',
        password: 'testPassword',
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should successfully log in a user', async () => {
    authDb.checkCredentials.mockResolvedValueOnce([{ id: 1 }]);

    jwt.sign.mockReturnValueOnce('testAccessToken');
    jwt.sign.mockReturnValueOnce('testRefreshToken');

    await logIn(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      accessToken: 'testAccessToken',
      refreshToken: 'testRefreshToken',
    });
  });

});

describe('logOut()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        refreshToken: 'testRefreshToken',
      },
    };
    res = {
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should log out a user by deleting the refresh token', async () => {
    authDb.deleteRefreshToken.mockResolvedValueOnce(true);

    await logOut(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith('Token deleted successfully');
  });

  it('should handle invalid refresh token during logout', async () => {
    authDb.deleteRefreshToken.mockResolvedValueOnce(false);

    await logOut(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: errorCodes.REFRESH_TOKEN_INVALID_ERROR,
    });
  });

});

describe('authorizeAccessToken()', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer testAccessToken',
      },
    };
    res = {
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('should authorize access with a valid access token', () => {
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, { name: 'testUser', id: 1 });
    });

    authorizeAccessToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ name: 'testUser', id: 1 });
  });

  it('should handle missing access token during authorization', () => {
    req.headers.authorization = undefined;

    authorizeAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: errorCodes.ACCESS_TOKEN_NEEDED_ERROR,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle invalid access token during authorization', () => {
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    authorizeAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: errorCodes.ACCESS_TOKEN_INVALID_ERROR,
    });
    expect(next).not.toHaveBeenCalled();
  });

});