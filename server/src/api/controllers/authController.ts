import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res
          .status(400)
          .json({ message: 'Please provide an email and password' });
        return;
      }

      const foundUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!foundUser) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const isMatch = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!isMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: '10m',
        }
      );

      const refreshToken = jwt.sign(
        {
          email: foundUser.email,
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
          expiresIn: '1d',
        }
      );

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        accessToken,
        UserInfo: {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
      res.status(400).json({
        message:
          'Please provide an email, password, first name and last name',
      });
      return;
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      res.status(400).json({
        message: 'User with this email already exists',
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: '10s',
      }
    );

    const refreshToken = jwt.sign(
      {
        email: newUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: '1d',
      }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      UserInfo: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });

    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const refresh = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      try {
        if (err) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const foundUser = await prisma.user.findUnique({
          where: {
            email: (decoded as any).email,
          },
        });

        if (!foundUser) {
          res.status(401).json({ message: 'Unauthorized' });
          return;
        }

        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: foundUser.id,
              email: foundUser.email,
              role: foundUser.role,
            },
          },
          process.env.ACCESS_TOKEN_SECRET as string,
          {
            expiresIn: '10s',
          }
        );

        res.json({
          accessToken,
          UserInfo: {
            id: foundUser.id,
            email: foundUser.email,
            role: foundUser.role,
          },
        });
      } catch (error) {
        // Forward error to the error handling middleware
        next(error);
      }
    }
  );
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.json({ message: 'Logged out' });
};

export { login, register, refresh, logout };
