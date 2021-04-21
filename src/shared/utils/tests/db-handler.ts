import mongoose from 'mongoose'
import {MongoMemoryServer} from 'mongodb-memory-server'

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
async function connect():Promise<void>{
    const uri = await mongod.getUri()

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    await mongoose.connect(uri, mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod.
 */
async function closeDatabase():Promise<void>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
async function clearDatabase() :Promise<void> {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}

export default {connect, closeDatabase, clearDatabase}
