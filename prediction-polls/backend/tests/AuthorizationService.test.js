const service = require('../src/services/AuthorizationService.js');
const db = require('../src/repositories/AuthorizationDB.js');
const authService = require('../src/services/AuthenticationService.js');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Mock the database functions
jest.mock('../src/repositories/AuthorizationDB.js', () => ({
    addRefreshToken: jest.fn(),
    checkRefreshToken: jest.fn(),
    deleteRefreshToken: jest.fn(),
}));

// Mock the AuthenticationService module
jest.mock('../src/services/AuthenticationService.js', () => {
    return {
        checkCredentials: jest.fn().mockImplementation(async (username, password) => {
            return true; // Customize this based on your test scenarios
        }),
        addUser: jest.fn().mockImplementation(async (username, password,email,birthday) => {
            return {"success":true,"error":undefined};
        })
    };
});

// Mock the jwt.verify function
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn((token, secret, callback) => {
      if (token === 'validRefreshToken') {
        callback(null, { name: 'testUser' });
      } else {
        callback(new Error('Invalid token'));
      }
    }),
    sign: jest.fn(),
  }));

jwt.sign.mockReturnValue('mockToken');

test('test if logIn returns accessToken and refreshToken', async () => {
    // Set up mock behavior for checkCredentials
    const username = 'testUsername';
    const password = 'asdadasd';
    db.checkCredentials = jest.fn().mockResolvedValue(true);

    const req = { body: { username, password } };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn(),
    };

    await service.logIn(req, res);

    // Assert that the correct functions were called and with the correct arguments
    expect(authService.checkCredentials).toHaveBeenCalledWith(username, password);
    expect(db.addRefreshToken).toHaveBeenCalledWith(expect.any(String));

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
    });
});


test('test if signup returns registration successful response ', async () => {
    // Set up mock behavior for checkCredentials
    const username = 'testUsername';
    const password = 'asdadasd';
    const email= 'test@mail.com';
    const birthday = '2004-10-8';

    const req = { body: { username, password, email, birthday } };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };

    await service.signup(req, res);

    // Assert that the correct functions were called and with the correct arguments
    expect(authService.addUser).toHaveBeenCalledWith(username, password, email, birthday);

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(201);
});

test('test if createAccessTokenFromRefreshToken returns accessToken', async () => {
  const req = { body: { refreshToken: 'validRefreshToken' } };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    send: jest.fn(),
  };

  await service.createAccessTokenFromRefreshToken(req, res);

  // Assert that the correct functions were called and with the correct arguments
  expect(jwt.verify).toHaveBeenCalledWith(
    'validRefreshToken',
    process.env.REFRESH_TOKEN_SECRET,
    expect.any(Function)
  );

  // Assert that the response was sent with the correct data
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({
    accessToken: expect.any(String),
  });
});

test('test if logout returns refresh token deleted', async () => {
    // Set up mock behavior for checkCredentials
    const refreshToken = 'refreshToken';

    const req = { body: {refreshToken } };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };

    db.deleteRefreshToken = jest.fn().mockResolvedValue(true);

    await service.logOut(req, res);

    expect(db.deleteRefreshToken).toHaveBeenCalledWith(expect.any(String));

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(204);
});

test('test if authorizeAccessToken returns refresh token deleted', async () => {
    // Set up mock behavior for checkCredentials
    const refreshToken = 'refreshToken';

    const req = { body: {refreshToken } };
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };

    db.deleteRefreshToken = jest.fn().mockResolvedValue(true);

    await service.logOut(req, res);

    expect(db.deleteRefreshToken).toHaveBeenCalledWith(expect.any(String));

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(204);
});

test('test if authorizeAccessToken authorizes correctly', async () => {
    // Set up mock behavior for jwt.verify
    jwt.verify.mockImplementation((token, secret, callback) => {
      if (token === 'validAccessToken') {
        callback(null, { name: 'testUser' });
      } else {
        callback(new Error('Invalid token'));
      }
    });
  
    const req = { headers: { authorization: 'Bearer validAccessToken' } };
    const res = {
      sendStatus: jest.fn(),
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const next = jest.fn();
  
    await service.authorizeAccessToken(req, res, next);
  
    // Assert that the correct functions were called and with the correct arguments
    expect(jwt.verify).toHaveBeenCalledWith(
      'validAccessToken',
      process.env.ACCESS_TOKEN_SECRET,
      expect.any(Function)
    );
  
    // Assert that req.user was set
    expect(req.user).toEqual({ name: 'testUser' });
  
    // Assert that next was called
    expect(next).toHaveBeenCalled();
  });
  
  test('test if authorizeAccessToken handles missing token', async () => {
    const req = { headers: {} };
    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();
  
    await service.authorizeAccessToken(req, res, next);
  
    // Assert that sendStatus was called with status 400
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  
    // Assert that next was not called
    expect(next).not.toHaveBeenCalled();
  });
  
  test('test if authorizeAccessToken handles invalid token', async () => {
    // Set up mock behavior for jwt.verify
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });
  
    const req = { headers: { authorization: 'Bearer invalidAccessToken' } };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const next = jest.fn();
  
    await service.authorizeAccessToken(req, res, next);
  
    // Assert that the correct functions were called and with the correct arguments
    expect(jwt.verify).toHaveBeenCalledWith(
      'invalidAccessToken',
      process.env.ACCESS_TOKEN_SECRET,
      expect.any(Function)
    );
  
    // Assert that res.status and res.send were called with the correct messages
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('The access token is invalid');
  
    // Assert that next was not called
    expect(next).not.toHaveBeenCalled();
  });
