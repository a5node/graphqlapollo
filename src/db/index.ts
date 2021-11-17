import mongoose from 'mongoose';
import config from '../config';
import { Http503Error } from '../errors/http-errors';

//Function for connection to database
const connectMongoDB = async (): Promise<void> => {
  try {
    const url = config.DATABASE_URI;
    const options = config.dbOptions;

    const connectDB = await mongoose.connect(url, options);
    console.log('\x1b[32m%s\x1b[0m', `MongoDB Connected: ${connectDB.connection.host}`);
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', 'Not connect mongo db');
    new Http503Error({ code: 2, message: 'Not connect db' });
  }
};

export default connectMongoDB;
