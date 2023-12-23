const { MongoClient, ServerApiVersion } = require('mongodb');
const { getAnnotations } = require('../src/services/AnnotationService.js'); // Adjust the path accordingly

// Mocking MongoClient and its methods
jest.mock('mongodb');

describe('getAnnotations', () => {
  beforeEach(() => {
    MongoClient.mockClear();
  });

  afterEach(() => {
    // Clear all instances and calls to constructor and all methods of MongoClient
    jest.clearAllMocks();
  });

  test('should retrieve annotations based on creator and source', async () => {
    const req = {
      query: {
        creator: 'JohnDoe',
        source: 'example.com',
      },
    };
    const res = {
      set: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };

    MongoClient.prototype.connect.mockResolvedValue();
    const toArrayMock = jest.fn().mockResolvedValue([{annotation: "example"}]);
    const findMock = jest.fn().mockReturnValue({toArray: toArrayMock});
    MongoClient.prototype.db.mockReturnValueOnce({ collection: jest.fn(() => ({ find: findMock })) });

    await getAnnotations(req, res);

    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(MongoClient.prototype.db).toHaveBeenCalledWith(process.env.MONGO_DB);
    expect(findMock).toHaveBeenCalledWith({ creator: 'JohnDoe', 'target.source': 'example.com' }, { projection: { _id: 0 } });
    expect(res.set).toHaveBeenCalledWith('content-type', 'application/ld+json');
    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ annotations: [{ annotation: 'example' }] }));
    expect(MongoClient.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('should handle errors and return 500 status', async () => {
    const req = {
      query: {
        creator: 'JohnDoe',
        source: 'example.com',
      },
    };
    const res = {
      set: jest.fn(),
      send: jest.fn(),
      status: jest.fn().mockReturnValue({json: jest.fn()}),
    };

    // Mock MongoClient methods to simulate an error
    MongoClient.prototype.connect.mockRejectedValue(new Error('Connection error'));

    await getAnnotations(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});