const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL
const url = process.env.url;
const client = new MongoClient(url);

// Database Name
const dbName = 'WA-INBOXDB';

async function connect_to_db() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    const db = client.db(dbName);
    const collection = db.collection('documents');
    return collection;
};



async function mongodb_initialize(collection) {
    let dok = null
    dok = await collection.findOne()
    if (dok == null) {
        console.log('No existing database found. Creating one...');
        const insertResult = await collection.insertOne({ message_id: 'RandomString' });
        //console.log('Inserted documents =>', insertResult);
        console.log("Created!");
        return 'RandomString';
    }

    else {
        console.log("Nice, message id database already exists!");
        console.log('Retrieved message_id from mongoDB : ',dok.message_id);
        return dok.message_id;
    }

}


async function UpdateMessage_ID(collection, string) {
    var prev_message_id = await collection.findOne();
    prev_message_id = prev_message_id.message_id;
    const updateResult = await collection.updateOne({ message_id: prev_message_id }, { $set: { message_id: string } });
    return 0;
}




module.exports = { connect_to_db, UpdateMessage_ID, mongodb_initialize };