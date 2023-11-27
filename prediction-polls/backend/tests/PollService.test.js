
const {addDiscretePoll, addContinuousPoll, voteDiscretePoll, voteContinuousPoll, getPolls, getPollWithId} = require('../src/services/PollService');
const db = require('../src/repositories/PollDB');
const {findUser} = require('../src/repositories/AuthorizationDB');
const errorCodes = require('../src/errorCodes');

jest.mock('../src/repositories/PollDB', () => ({
  addDiscretePoll: jest.fn().mockResolvedValue(1),
  addContinuousPoll: jest.fn().mockResolvedValue(1),
  getContinuousPollWithId: jest.fn().mockResolvedValue([ { id: 2, cont_poll_type: 'numeric' } ]),
  getContinuousPollVotes: jest.fn().mockResolvedValue([]),
  voteDiscretePoll: jest.fn().mockResolvedValue(0),
  voteContinuousPoll: jest.fn().mockResolvedValue(0),
  getTagsOfPoll: jest.fn().mockResolvedValue([]),
  choicesWithVoteCount: jest.fn().mockResolvedValue(0),
  getDiscreteVoteCount: jest.fn().mockResolvedValue(0),
  getDiscretePollChoices: jest.fn().mockResolvedValue([
    { id: 1, choice_text: 'Trump', poll_id: 1 },
    { id: 2, choice_text: 'Biden', poll_id: 1 }
  ]),
  getPolls: jest.fn().mockResolvedValue([
    {
      id: 1,
      question: 'Who will win the 2024 Election to become President?',
      username: 'sefik2',
      poll_type: 'discrete',
      openVisibility: 1,
      setDueDate: 1,
      closingDate: '2023-12-29T21:00:00.000Z',
      numericFieldValue: 2,
      selectedTimeUnit: 'min',
      isOpen: true
    },
    {
      id: 2,
      question: 'Question 2?',
      username: 'sefik2',
      poll_type: 'continuous',
      openVisibility: 0,
      setDueDate: 1,
      closingDate: '2023-11-20T21:00:00.000Z',
      numericFieldValue: 5,
      selectedTimeUnit: 'min',
      isOpen: true
    }
  ]),
  getPollWithId: jest.fn().mockResolvedValue([
    {
      id: 1,
      question: 'Who will win the 2024 Election to become President?',
      username: 'sefik2',
      poll_type: 'discrete',
      openVisibility: 1,
      setDueDate: 1,
      closingDate: '2023-12-29T21:00:00.000Z',
      numericFieldValue: 2,
      selectedTimeUnit: 'min',
      isOpen: true
    }
  ])
}));

jest.mock('../src/repositories/AuthorizationDB', () => ({
  findUser: jest.fn().mockResolvedValue({ username: 'mocked-username' }),
}));

describe('addDiscretePoll()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        question: "Who will win the 2024 Election to become President?",
        choices: [
          "Trump",
          "Biden"
        ],
        openVisibility: true,
        setDueDate: true,
        dueDatePoll: "2023-12-30T11:39:00+03:00",
        numericFieldValue: 2,
        selectedTimeUnit: "min"
      },
      user: {
        id: 1,
      },
    }
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  })

  it('should return success and newPollId on successful addition', async () => {
    const insertId = 1;
    db.addDiscretePoll.mockResolvedValueOnce(insertId);
    await addDiscretePoll(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      newPollId: insertId,
    });
  });

  it('return error when addDiscretePoll throws database Error', async () => {
    db.addDiscretePoll.mockRejectedValueOnce({error: errorCodes.DATABASE_ERROR});
    await addDiscretePoll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({error: errorCodes.DATABASE_ERROR});
  });

  it('returns 400 when passed in empty body', async () => {
    req.body = {};
    await addDiscretePoll(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorCodes.BAD_DISCRETE_POLL_REQUEST_ERROR });
  });
});

describe('addContinuousPoll()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        question: "Question 2?",
        "setDueDate": true,
        "dueDatePoll": "2023-11-21T11:39:00+03:00",
        "numericFieldValue": 5,
        "selectedTimeUnit": "min",
        "cont_poll_type": "numeric"
      },
      user: {
        id: 1,
      },
    }
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  })

  it('should return success and newPollId on successful addition', async () => {
    const insertId = 1;
    db.addContinuousPoll.mockResolvedValueOnce(insertId);
    await addContinuousPoll(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      newPollId: insertId,
    });
  });

  it('return error when addDiscretePoll throws database Error', async () => {
    db.addContinuousPoll.mockRejectedValueOnce({error: errorCodes.DATABASE_ERROR});
    await addContinuousPoll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({error: errorCodes.DATABASE_ERROR});
  });

  it('returns 400 when passed in empty body', async () => {
    req.body = {};
    await addContinuousPoll(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorCodes.BAD_CONT_POLL_REQUEST_ERROR });
  });

});

describe('voteDiscretePoll()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        pollId: 1
      },
      user: {
        id: 1
      },
      body: {
        choiceId: 1,
        points: 50
      }
    }
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  })

  it('should return success on successful voting', async () => {
    const choices = [{id: 1}, {id: 2}, {id: 3}];
    db.getDiscretePollChoices.mockResolvedValueOnce(choices);
    await voteDiscretePoll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Vote Successful" });
  });

  it('should return 404 on choice not found', async () => {
    const choices = [{id: 2}, {id: 3}];
    db.getDiscretePollChoices.mockResolvedValueOnce(choices);
    await voteDiscretePoll(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({error: errorCodes.CHOICE_DOES_NOT_EXIST_ERROR});
  });

  it('should return 404 on negative points passed', async () => {
    const choices = [{id: 1}, {id: 2}, {id: 3}];
    req.body.points = -1;
    await voteDiscretePoll(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({error: errorCodes.USER_MUST_GIVE_POINTS_ERROR});
  });

  it('should return 404 on no points passed', async () => {
    const choices = [{id: 1}, {id: 2}, {id: 3}];
    req.body.points = null;
    await voteDiscretePoll(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: errorCodes.USER_MUST_GIVE_POINTS_ERROR });
  });
});

describe('voteContinuousPoll()', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {
        pollId: 1
      },
      user: {
        id: 1
      },
      body: {
        choice: 1,
        points: 50
      }
    }
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  })

  it('should return 200 on successful voting on discrete polls', async () => {
    db.getContinuousPollWithId.mockResolvedValueOnce([{
      cont_poll_type: 'numeric'
    }]);
    await voteContinuousPoll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Vote Successful" });
  });

  it('should return 200 on successful voting on continuous polls', async () => {
    db.getContinuousPollWithId.mockResolvedValueOnce([{
      cont_poll_type: 'date'
    }]);
    await voteContinuousPoll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Vote Successful" });
  });

  it('should return 404 on giving negative points', async () => {
    req.body.points = -1
    await voteContinuousPoll(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: errorCodes.USER_MUST_GIVE_POINTS_ERROR });
  });

  it('should return 404 on no points passed', async () => {
    req.body.points = null;
    await voteContinuousPoll(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: errorCodes.USER_MUST_GIVE_POINTS_ERROR });
  });
});

describe('getPolls()', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  })

  it('should return pollObjects on successful get request', async () => {
    // db.getContinuousPollWithId.mockResolvedValueOnce([ { id: 2, cont_poll_type: 'numeric' } ])
    await getPolls(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(
      [
        {
            id: 1,
            question: "Who will win the 2024 Election to become President?",
            tags: [],
            creatorName: "sefik2",
            creatorUsername: "sefik2",
            creatorImage: null,
            pollType: "discrete",
            closingDate: "2023-12-29T21:00:00.000Z",
            rejectVotes: "2 min",
            isOpen: true,
            comments: [],
            options: [
                {
                    id: 1,
                    choice_text: "Trump",
                    poll_id: 1,
                    voter_count: 0
                },
                {
                    id: 2,
                    choice_text: "Biden",
                    poll_id: 1,
                    voter_count: 0
                }
            ]
        },
        {
            id: 2,
            question: "Question 2?",
            tags: [],
            creatorName: "sefik2",
            creatorUsername: "sefik2",
            creatorImage: null,
            pollType: "continuous",
            closingDate: "2023-11-20T21:00:00.000Z",
            rejectVotes: "5 min",
            isOpen: true,
            options: [],
            comments: [],
            cont_poll_type: "numeric"
        }
    ]);
  });
});

describe('getPollWithId()', () => {
  let req, res;

  beforeEach(() => {
    req = {params: {pollId: 1}};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  })

  it('should return pollObjects on successful get request for discretePoll', async () => {
    await getPollWithId(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      question: "Who will win the 2024 Election to become President?",
      tags: [],
      creatorName: "sefik2",
      creatorUsername: "sefik2",
      creatorImage: null,
      pollType: "discrete",
      closingDate: "2023-12-29T21:00:00.000Z",
      rejectVotes: "2 min",
      isOpen: true,
      comments: [],
      options: [
          {
              id: 1,
              choice_text: "Trump",
              poll_id: 1,
              voter_count: 0
          },
          {
              id: 2,
              choice_text: "Biden",
              poll_id: 1,
              voter_count: 0
          }
      ]
    });
  });

  it('should return correct pollObjects on successful get request for a continuous poll', async () => {
    req.params.pollId = 2;
    db.getPollWithId.mockResolvedValue([
      {
        id: 2,
        question: 'Question 2?',
        username: 'sefik2',
        poll_type: 'continuous',
        openVisibility: 0,
        setDueDate: 1,
        closingDate: '2023-11-20T21:00:00.000Z',
        numericFieldValue: 5,
        selectedTimeUnit: 'min',
        isOpen: true
      }
    ])
    await getPollWithId(req, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
        id: 2,
        question: "Question 2?",
        tags: [],
        creatorName: "sefik2",
        creatorUsername: "sefik2",
        creatorImage: null,
        pollType: "continuous",
        closingDate: "2023-11-20T21:00:00.000Z",
        rejectVotes: "5 min",
        isOpen: true,
        comments: [],
        cont_poll_type: "numeric"
    });
  });
});