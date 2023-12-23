const { MongoClient, ServerApiVersion } = require('mongodb');
const { resolve } = require('url');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getAnnotations(req, res) {
  const { creator, source } = req.query;
  let filter = {};

  if (creator) {
    filter.creator = creator;
  }

  if (source) {
    filter['target.source'] = source;
  }

  try {
    await client.connect();

    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection(process.env.MONGO_COLLECTION);

    const annotations = await collection.find(filter, { projection: { _id: 0 } }).toArray();

    client.close();

    res.set('content-type', 'application/ld+json');
    res.send(JSON.stringify({"annotations": annotations}));
  } catch (error) {
    console.error('Error fetching annotations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAnnotationWithId(req, res) {
  const annotationId = req.params.id;

  try {
    await client.connect();

    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection(process.env.MONGO_COLLECTION);

    const annotation = await collection.findOne({ id: new RegExp(`.*${annotationId}$`) }, {projection: {"_id": 0}});

    if (!annotation) {
      return res.status(404).json({ error: 'Annotation not found' });
    }

    res.set('content-type', 'application/ld+json');
    res.send(JSON.stringify(annotation));
  } catch (error) {
    console.error('Error fetching annotations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
}

async function createAnnotation(req, res) {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection(process.env.MONGO_COLLECTION);

    const result = await collection.insertOne(req.body);

    const uniqueIdentifier = result.insertedId instanceof ObjectId ? result.insertedId.toString(): null;

    const newIRI = resolve(process.env.ANNOTATION_URI, "/annotations") + '/' + uniqueIdentifier;
    await collection.updateOne(
      { _id: result.insertedId },
      { $set: { id: newIRI } }
    );

    res.status(200).json({success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error})
  }
}

async function deleteAnnotationWithId(req, res) {
  const annotationId = req.params.id;

  try {
    await client.connect();

    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection(process.env.MONGO_COLLECTION);

    const result = await collection.deleteOne({ id: new RegExp(`.*${annotationId}$`) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Annotation not found' });
    }

    client.close();

    res.json({ message: 'Annotation deleted successfully' });
  } catch (error) {
    console.error('Error deleting annotation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function patchAnnotationWithId(req, res) {
  const annotationId = req.params.id;
  const updatedBody = req.body;

  try {
    await client.connect();

    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection(process.env.MONGO_COLLECTION);

    const result = await collection.updateOne(
      { id: new RegExp(`.*${annotationId}$`) },
      { $set: { body: updatedBody } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Annotation not found' });
    }

    client.close();

    res.json({ message: 'Annotation updated successfully' });
  } catch (error) {
    console.error('Error updating annotation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = { getAnnotations, createAnnotation, getAnnotationWithId, deleteAnnotationWithId, patchAnnotationWithId };