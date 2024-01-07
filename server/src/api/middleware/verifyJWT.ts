import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

type User = {
  id: number;
  email: string;
  role: string;
};

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
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: 'You are not authorized' });
          return;
        }
        // @ts-ignore
        req.user = decoded.UserInfo;
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export default verifyJWT;
