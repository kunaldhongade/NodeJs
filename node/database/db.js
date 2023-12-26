const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// database name
const dbName = 'nodejs_course';

async function connect() {
    await client.connect();
    console.log("Connected successfully to database server");
    const db = await client.db(dbName);
    return db;
}

module.exports = connect;