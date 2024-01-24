// Import statements remain the same
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

type User = {
  id: number;
  email: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const verifyJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'You are not authorized' });
      return;
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, decoded: any) => {
        if (err) {
          res.status(401).json({ message: err.message });
          return;
        }
        if (decoded && typeof decoded === 'object') {
          req.user = decoded.UserInfo as User;
        }
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export default verifyJWT;
