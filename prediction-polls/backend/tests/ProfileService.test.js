const service = require('../src/services/ProfileService.js');
const db = require('../src/repositories/ProfileDB.js');
const authDb = require('../src/repositories/AuthorizationDB.js');

// Mock the ProfileDB module
jest.mock('../src/repositories/ProfileDB.js', () => ({
    findUser: jest.fn(),
    getProfileWithUserId: jest.fn(),
    getProfileWithProfileId: jest.fn(),
    addProfile: jest.fn(),
    updateProfile: jest.fn(),
}));

// Mock the AuthorizationDB module
jest.mock('../src/repositories/AuthorizationDB.js', () => ({
    findUser: jest.fn(),
}));

test('test if getProfile returns profile data', async () => {
    // Set up mock behavior for findUser and getProfileWithUserId
    const userId = 2;
    const username = 'testUsername';
    const email = 'test@mail.com';
    const password = "testPassword.";

    const profile = { id: 2,username,email,biograhpy:"Biograhpy"};

    authDb.findUser.mockResolvedValue({ id: userId, username, email, password });
    db.getProfileWithUserId.mockResolvedValue({ profile: profile});

    const req = { query: { userId, username, email } };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
    };

    await service.getProfile(req, res);

    // Assert that the correct functions were called and with the correct arguments
    expect(authDb.findUser).toHaveBeenCalledWith({ userId, username, email });
    expect(db.getProfileWithUserId).toHaveBeenCalledWith(userId);

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(profile);
});

test('test if getProfileWithProfileId returns profile data', async () => {
    // Set up mock behavior for getProfileWithProfileId
    const profileId = 1;

    const profile = { id: 2,username:"testUsername",email:"email@test.com",biograhpy:"Biograhpy"};

    db.getProfileWithProfileId.mockResolvedValue({ profile: profile});

    const req = { params: { profileId } };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
    };

    await service.getProfileWithProfileId(req, res);

    // Assert that the correct function was called and with the correct arguments
    expect(db.getProfileWithProfileId).toHaveBeenCalledWith(profileId);

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(profile);
});

test('test if addProfile returns added profile data', async () => {
    // Set up mock behavior for findUser, addProfile, and getProfileWithUserId
    const userId = 2;
    const username = 'testUsername';
    const email = 'test@mail.com';

    const profile = { userId,username,email,biography:"Biography"};

    authDb.findUser.mockResolvedValue({ userId, username, email });
    db.addProfile.mockResolvedValue({ profileId: 5 });
    db.getProfileWithUserId.mockResolvedValue({ profile: profile});

    const req = { body: { userId, username, email, biography:"Biography" } };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
    };

    await service.addProfile(req, res);

    // Assert that the correct functions were called and with the correct arguments
    expect(authDb.findUser).toHaveBeenCalledWith({ userId, username, email });
    expect(db.addProfile).toHaveBeenCalledWith({ userId, username, email, biography:"Biography","isHidden": undefined, "profile_picture": undefined, "userId": undefined });
    expect(db.getProfileWithUserId).toHaveBeenCalledWith(userId);

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ userId, username, email, biography:"Biography","isHidden": undefined, "profile_picture": undefined, "userId": undefined });
});

test('test if updateProfile returns updated profile data', async () => {
    // Set up mock behavior for findUser, updateProfile, and getProfileWithUserId
    const userId = 'testUserId';
    const username = 'testUsername';
    const email = 'test@mail.com';

    authDb.findUser.mockResolvedValue({ id: userId, username, email });
    db.updateProfile.mockResolvedValue({ status: 'updated', error: undefined });
    db.getProfileWithUserId.mockResolvedValue({ profile: { /* updated profile data */ }, user_error: undefined });

    const req = { body: { userId, username, email, /* updated profile data */ } };
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
    };

    await service.updateProfile(req, res);

    // Assert that the correct functions were called and with the correct arguments
    expect(authDb.findUser).toHaveBeenCalledWith({ userId, username, email });
    expect(db.updateProfile).toHaveBeenCalledWith({ userId, /* updated profile data */ });
    expect(db.getProfileWithUserId).toHaveBeenCalledWith(userId);

    // Assert that the response was sent with the correct data
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ /* updated profile data */ });
});