import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import verifyJWT from './api/middleware/verifyJWT';

//utils
import corsOptions from './config/corsOptions';
import logger from './api/utils/logger';
import notFound from './api/utils/notFound';

//middleware
import morganMiddleware from './api/middleware/morganMiddleware';
import errorHandler from './api/middleware/errorHandler';

//routes
import userRoutes from './api/routes/userRoutes';
import authRoutes from './api/routes/authRoutes';

console.log('server starting...');
const app = express();

//middleware
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
} else {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
  );
}

//routes
app.get('/api/v1/test', (req, res) => {
  logger.info('this is a test');
  res.send('the test was successful');
});
//test protected route
app.get('/api/v1/protected', verifyJWT, (req, res) => {
  logger.info('this is a test');
  res.send('the protected test was successful');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  logger.info(`Server listening on port ${process.env.PORT}!`);
});
