import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import logger from './utils/logger';
import morganMiddleware from './middleware/morganMiddleware';

console.log('server starting...');
const app = express();

app.use(morganMiddleware);

app.get('/api/v1', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening on port ${process.env.PORT}!`)
);
