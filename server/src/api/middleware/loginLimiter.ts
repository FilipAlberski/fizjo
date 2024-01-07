import rateLimit from 'express-rate-limit';
import logger from '../utils/logger';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    'Too many login attempts, please try again after 15 minutes',
  handler: (req, res, options) => {
    logger.warn(
      `Too many login attempts from ${req.ip} at ${req.originalUrl}`
    );
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
