const {
    getProfile,
    getProfileWithProfileId,
    getMyProfile,
    updateProfile,
    uploadImagetoS3
  } = require('../src/services/ProfileService');
  const db = require('../src/repositories/ProfileDB');
  const authDb = require('../src/repositories/AuthorizationDB');
  const aws = require('aws-sdk');
  
  jest.mock('aws-sdk');
  jest.mock('../src/repositories/ProfileDB');
  jest.mock('../src/repositories/AuthorizationDB');
  
  describe('getProfile()', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        query: { userId: 1, username: 'testUser', email: 'test@example.com' },
      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });
  
    it('should return user profile with badges', async () => {
      const profileResult = {
        profile: {
          id: 2,
          userId: 1,
          username: 'testUser',
          email: 'test@example.com',
          profile_picture: null,
          badges: ['Badge1', 'Badge2'],
        },
      };
  
      db.getProfileWithUserId.mockResolvedValueOnce(profileResult);
      authDb.findUser.mockResolvedValueOnce({ id: 1, username: 'testUser', email: 'test@example.com' });
      db.getBadges.mockResolvedValueOnce({badges:[{topic:"basketball",userRank:1}]})

      await getProfile(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(profileResult.profile);
    });
  
    it('should handle errors and return 400 status', async () => {
      const errorMessage = 'Error fetching profile';
  
      db.getProfileWithUserId.mockResolvedValueOnce({ error: errorMessage });
      authDb.findUser.mockResolvedValueOnce({ id: 1, username: 'testUser', email: 'test@example.com' });
      db.getBadges.mockResolvedValueOnce({badges:[{topic:"basketball",userRank:1}]})
  
      await getProfile(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });


  describe('getProfileWithProfileId()', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        params: { profileId: 2 },
      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });
  
    it('should return user profile with badges', async () => {
        const profileResult = {
            profile: {
              id: 2,
              userId: 1,
              username: 'testUser',
              email: 'test@example.com',
              profile_picture: null,
              badges: ['Badge1', 'Badge2'],
            },
        };
  
      db.getProfileWithProfileId.mockResolvedValueOnce(profileResult);
      db.getBadges.mockResolvedValueOnce({badges:[{topic:"basketball",userRank:1}]})
  
      await getProfileWithProfileId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(profileResult.profile);
    });
  
    it('should handle errors and return 400 status', async () => {
      const errorMessage = 'Error fetching profile';
  
      db.getProfileWithProfileId.mockResolvedValueOnce({ error: errorMessage });
      db.getBadges.mockResolvedValueOnce({badges:[{topic:"basketball",userRank:1}]})
  
      await getProfileWithProfileId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  
  describe('getMyProfile()', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        user: { id: 1 },
      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });
  
    it('should return user profile with badges', async () => {
        const profileResult = {
            profile: {
                id: 2,
                userId: 1,
                username: 'testUser',
                email: 'test@example.com',
                profile_picture: null,
                badges: ['Badge1', 'Badge2'],
            },
        };
  
      db.getProfileWithUserId.mockResolvedValueOnce(profileResult);
      authDb.findUser.mockResolvedValueOnce({ id: 1, username: 'testUser', email: 'test@example.com' });
      db.getBadges.mockResolvedValueOnce({badges:[{topic:"basketball",userRank:1}]})
  
      await getMyProfile(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(profileResult.profile);
    });
  
    it('should handle errors and return 400 status', async () => {
      const errorMessage = 'Error fetching profile';
  
      db.getProfileWithUserId.mockResolvedValueOnce({ error: errorMessage });
      authDb.findUser.mockResolvedValueOnce({ id: 1, username: 'testUser', email: 'test@example.com' });
      db.getBadges.mockResolvedValueOnce({badges:[{topic:"basketball",userRank:1}]})
  
      await getMyProfile(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });


  describe('updateProfile()', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        body: {
          userId: 1,
          username: 'testUser',
          email: 'test@example.com',
          biography: 'New biography',
          birthday: null,
          isHidden: true,
        },
      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });
  
    it('should update user profile and return the updated profile', async () => {
      const updatedProfileResult = {
        profile: {
          userId: 1,
          username: 'testUser',
          email: 'test@example.com',
          profile_picture: null,
          biography: 'New biography',
          birthday: null,
          isHidden: true,
        },
      };
  
      db.updateProfile.mockResolvedValueOnce({ status: 'Updated successfully' });
      db.getProfileWithUserId.mockResolvedValueOnce(updatedProfileResult);
      authDb.findUser.mockResolvedValueOnce({ id: 1, username: 'testUser', email: 'test@example.com' });
  
      await updateProfile(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedProfileResult.profile);
    });
  
    it('should handle errors and return 400 status', async () => {
      const errorMessage = 'Error updating profile';
  
      db.updateProfile.mockResolvedValueOnce({ error: errorMessage });
      authDb.findUser.mockResolvedValueOnce({ id: 1, username: 'testUser', email: 'test@example.com' });
  
      await updateProfile(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  
  
  // Add similar test cases for other functions (getProfileWithProfileId, getMyProfile, updateProfile, uploadImagetoS3)
  