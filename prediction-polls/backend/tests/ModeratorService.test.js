const ModeratorService = require('../src/services/ModeratorService');
const ModeratorDB = require('../src/repositories/ModeratorDB');
const PollDB = require('../src/repositories/PollDB');
const PollService = require('../src/services/PollService');
const AuthorizationDB = require('../src/repositories/AuthorizationDB');
const errorCodes = require('../src/errorCodes');
const topics = require('../src/routines/topics.json');

jest.mock('../src/repositories/ModeratorDB');
jest.mock('../src/repositories/PollDB');
jest.mock('../src/services/PollService');
jest.mock('../src/repositories/AuthorizationDB');

describe('ModeratorService', () => {
  describe('controlModRole()', () => {
    let req, res, next;

    beforeEach(() => {
      req = { user: { id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });

    it('should pass control for a moderator user', async () => {
      AuthorizationDB.findUser.mockResolvedValueOnce({ isMod: true });

      await ModeratorService.controlModRole(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 500 status for non-moderator user', async () => {
      AuthorizationDB.findUser.mockResolvedValueOnce({ isMod: false });

      await ModeratorService.controlModRole(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorCodes.USER_IS_NOT_MODERATOR });
    });

    it('should return 500 status for user not found', async () => {
      AuthorizationDB.findUser.mockResolvedValueOnce({ error: 'User not found' });

      await ModeratorService.controlModRole(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorCodes.USER_NOT_FOUND });
    });
  });

  describe('requestModRole()', () => {
    let req, res;

    beforeEach(() => {
      req = { user: { id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should return success for valid request', async () => {
      ModeratorDB.addPromotionRequest.mockResolvedValueOnce({});

      await ModeratorService.requestModRole(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success' });
    });

    it('should return 400 status for user not found', async () => {
      ModeratorDB.addPromotionRequest.mockResolvedValueOnce({ error: 'User not found' });

      await ModeratorService.requestModRole(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorCodes.USER_NOT_FOUND });
    });
  });

  describe('makeMod()', () => {
    let req, res;

    beforeEach(() => {
      req = { body: { userId: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should return success for valid appointment', async () => {
      ModeratorDB.makeMod.mockResolvedValueOnce({});

      await ModeratorService.makeMod(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success' });
    });

    it('should return 400 status for user not found', async () => {
      ModeratorDB.makeMod.mockResolvedValueOnce({ error: 'User not found' });

      await ModeratorService.makeMod(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorCodes.USER_NOT_FOUND });
    });
  });

});