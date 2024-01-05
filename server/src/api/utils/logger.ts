// utils/logger.ts

//TODO: repair file writing

import winston, { format } from 'winston';
import path from 'path';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'blue',
  debug: 'magenta',
  silly: 'white',
});

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const logger = winston.createLogger({
  levels,
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'http.log'),
      level: 'http',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'combined.log'),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: 'http',
    })
  );
}

export default logger;
