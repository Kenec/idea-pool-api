import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './routes';
import client from './config/redis';

dotenv.config();
const app = express();

let connectionString;

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PROD_DATABASE_URL
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DATA_URL
} else {
  connectionString = process.env.DEV_DATABASE_URL  
}

mongoose.connect(connectionString, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => console.log('We are connected!'));
client.on('error', error => console.error('ERR:REDIS:', error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', routes);

export default app;