import logger from '../utils/logger';

import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = res.statusCode ? res.statusCode : 500;
  logger.error(
    `${status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.status(status);

  res.json({
    message: err.message,
  });
};

export default errorHandler;
