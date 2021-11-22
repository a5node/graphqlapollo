import mongoose from 'mongoose';
import config from '../config';
import { Http503Error } from '../errors/http-errors';

//Function for connection to database
const connectMongoDB = async (): Promise<void> => {
  try {
    const url = config.DATABASE_URI;
    const options = config.dbOptions;

    const connectDB = await mongoose.connect(url, options);
    const db = mongoose.connection;

    console.log('\x1b[32m%s\x1b[0m', `MongoDB Connected: ${connectDB.connection.host}`);

    db.on('connecting', function () {
      console.log('\x1b[33m%s\x1b[0m', 'connecting to MongoDB...');
    });

    db.on('connected', function () {
      console.log('\x1b[33m%s\x1b[0m', 'MongoDB connected!');
    });
    db.on('reconnected', function () {
      console.log('\x1b[33m%s\x1b[0m', 'MongoDB reconnected!');
    });

    db.once('open', function () {
      console.log('\x1b[32m%s\x1b[0m', `MongoDB connection opened: ${connectDB.connection.host}`);
    });

    db.on('disconnected', function () {
      console.log('\x1b[31m%s\x1b[0m', 'MongoDB disconnected!');
      setTimeout(() => mongoose.connect(url, options), 5000);
    });

    const err = await new Promise((res, rej) => {
      db.on('error', function (error) {
        rej(error);
        console.log('\x1b[31m%s\x1b[0m', 'Error in MongoDb connection: ' + error);
        mongoose.disconnect();
      });
    });
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', 'Failed to connect to mongo on startup - retrying in 5 sec');
    setTimeout(connectMongoDB, 500);
  }
};

export default connectMongoDB;
