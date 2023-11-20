const { getPollWithId } = require('../src/services/PollService.js');
const db = require('../src/repositories/PollDB.js');
const errorCodes = require("../src/errorCodes.js")

jest.mock('../src/repositories/PollDB');

describe('getPollWithId', () => {
  test('returns a 404 response for non-existing poll', async () => {
    const req = { params: { pollId: 'nonexistentId' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    db.getPollWithId.mockResolvedValue([]);

    await getPollWithId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      code: errorCodes.NO_SUCH_POLL_ERROR.code,
      message: errorCodes.NO_SUCH_POLL_ERROR.message,
    });
  });
});