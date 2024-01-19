import rateLimit from 'express-rate-limit';
import logger from '../utils/logger';

const loginLimiter = rateLimit({
  windowMs: 60 * 1000 * 5,
  max: 5,
  message: 'Too many login attempts, please try again later.',
  handler: (req, res) => {
    logger.warn(`Too many login attempts from ${req.ip}`);
    res.status(429);
    throw new Error(
      'Too many login attempts, please try again later.' //important!
    );
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default loginLimiter;
