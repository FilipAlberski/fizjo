import logger from '../utils/logger';

import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);
};
