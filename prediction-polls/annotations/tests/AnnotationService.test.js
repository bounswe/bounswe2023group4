const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { getAnnotations, getAnnotationWithId, createAnnotation, deleteAnnotationWithId } = require('../src/services/AnnotationService.js'); // Adjust the path accordingly

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

  test('should retrieve annotation with valid id', async () => {
    const req = {
      params: {
        id: 'validId',
      },
    };
    const res = {
      set: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
      json: jest.fn(),
    };

    // Mock MongoClient methods as needed
    MongoClient.prototype.connect.mockResolvedValue();
    const findOneMock = jest.fn().mockResolvedValue({ annotation: 'example' });
    MongoClient.prototype.db.mockReturnValueOnce({ collection: jest.fn(() => ({ findOne: findOneMock })) });

    await getAnnotationWithId(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(MongoClient.prototype.db).toHaveBeenCalledWith(process.env.MONGO_DB);
    expect(findOneMock).toHaveBeenCalledWith({ id: new RegExp(`.*validId$`) }, { projection: { _id: 0 } });
    expect(res.set).toHaveBeenCalledWith('content-type', 'application/ld+json');
    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ annotation: 'example' }));
    expect(MongoClient.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('should return 404 for non-existing id', async () => {
    const req = {
      params: {
        id: 'nonExistingId',
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({json: jest.fn()}),
    };

    // Mock MongoClient methods to simulate non-existing id
    MongoClient.prototype.connect.mockResolvedValue();
    const findOneMock = jest.fn().mockResolvedValue(null);
    MongoClient.prototype.db.mockReturnValueOnce({ collection: jest.fn(() => ({ findOne: findOneMock })) });

    await getAnnotationWithId(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(MongoClient.prototype.db).toHaveBeenCalledWith(process.env.MONGO_DB);
    expect(findOneMock).toHaveBeenCalledWith({ id: new RegExp(`.*nonExistingId$`) }, { projection: { _id: 0 } });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(MongoClient.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('should handle errors and return 500 status', async () => {
    const req = {
      params: {
        id: 'validId',
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({json: jest.fn()}),
    };

    // Mock MongoClient methods to simulate an error
    MongoClient.prototype.connect.mockRejectedValue(new Error('Connection error'));

    await getAnnotationWithId(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  test('should create annotation successfully', async () => {
    const req = {
      body: {
        // Provide the body of the request here
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({json: jest.fn()}),
    };

    // Mock MongoClient methods as needed
    MongoClient.prototype.connect.mockResolvedValue();
    const insertOneMock = jest.fn().mockResolvedValue({
      insertedId: new ObjectId(),
    });
    const updateOneMock = jest.fn().mockResolvedValue();
    MongoClient.prototype.db.mockReturnValueOnce({
      collection: jest.fn(() => ({
        insertOne: insertOneMock,
        updateOne: updateOneMock,
      })),
    });

    await createAnnotation(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(MongoClient.prototype.db).toHaveBeenCalledWith(process.env.MONGO_DB);
    expect(insertOneMock).toHaveBeenCalledWith(req.body);
    expect(updateOneMock).toHaveBeenCalledWith(
      { _id: expect.any(ObjectId) },
      { $set: { id: expect.any(String) } }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(MongoClient.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('should handle errors and return 500 status', async () => {
    const req = {
      body: {
        // Provide the body of the request here
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({json: jest.fn()}),
    };

    // Mock MongoClient methods to simulate an error
    MongoClient.prototype.connect.mockRejectedValue(new Error('Connection error'));

    await createAnnotation(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });


  test('should delete annotation successfully', async () => {
    const req = {
      params: {
        id: 'validId',
      },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };

    // Mock MongoClient methods as needed
    MongoClient.prototype.connect.mockResolvedValue();
    const deleteOneMock = jest.fn().mockResolvedValue({
      deletedCount: 1,
    });
    MongoClient.prototype.db.mockReturnValueOnce({
      collection: jest.fn(() => ({
        deleteOne: deleteOneMock,
      })),
    });

    await deleteAnnotationWithId(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(MongoClient.prototype.db).toHaveBeenCalledWith(process.env.MONGO_DB);
    expect(deleteOneMock).toHaveBeenCalledWith({ id: new RegExp(`.*validId$`) });
    expect(res.status).not.toHaveBeenCalled(); // We don't expect a status to be set in this case
    expect(res.json).toHaveBeenCalledWith({ message: 'Annotation deleted successfully' });
    expect(MongoClient.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('should return 404 for non-existing id', async () => {
    const req = {
      params: {
        id: 'nonExistingId',
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({json: jest.fn()}),
      json: jest.fn(),
    };

    // Mock MongoClient methods to simulate non-existing id
    MongoClient.prototype.connect.mockResolvedValue();
    const deleteOneMock = jest.fn().mockResolvedValue({
      deletedCount: 0,
    });
    MongoClient.prototype.db.mockReturnValueOnce({
      collection: jest.fn(() => ({
        deleteOne: deleteOneMock,
      })),
    });

    await deleteAnnotationWithId(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(MongoClient.prototype.db).toHaveBeenCalledWith(process.env.MONGO_DB);
    expect(deleteOneMock).toHaveBeenCalledWith({ id: new RegExp(`.*nonExistingId$`) });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(MongoClient.prototype.close).toHaveBeenCalledTimes(1);
  });

  test('should handle errors and return 500 status', async () => {
    const req = {
      params: {
        id: 'validId',
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({json: jest.fn()}),
      json: jest.fn(),
    };

    // Mock MongoClient methods to simulate an error
    MongoClient.prototype.connect.mockRejectedValue(new Error('Connection error'));

    await deleteAnnotationWithId(req, res);

    // Assertions
    expect(MongoClient.prototype.connect).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});