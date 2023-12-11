const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getAllAnnotations(req, res) {
  try {
    await client.connect();

    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection(process.env.MONGO_COLLECTION);

    const annotations = await collection.find({}, { projection: { _id: 0 } }).toArray();

    client.close();

    res.json(annotations);
  } catch (error) {
    console.error('Error fetching annotations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createAnnotation(req, res) {
  try {
    await client.connect();
    const database = client.db(process.env.MONGO_DB);
    const collection = database.collection(process.env.MONGO_COLLECTION);

    const result = await collection.insertOne(req.body);

    res.status(200).json({success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error})
  }
}

module.exports = { getAllAnnotations, createAnnotation };