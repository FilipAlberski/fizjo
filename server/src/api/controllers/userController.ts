import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

// @desc Get all users
// @route GET /api/v1/users
// @access Private/Admin
const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await prisma.user.findMany({});
      if (!users) {
        res.status(404).json({ message: 'No users found' });
        return; // Make sure to return here so that the function execution stops
      }

      res.json(users);
    } catch (error) {
      // Forward error to the error handling middleware
      next(error);
    }
  }
);

// @desc Create a user
// @route POST /api/v1/users
// @access public

const createNewUser = asyncHandler(
  async (req: Request, res: Response) => {}
);

// @desc Update a user
// @route PATCH /api/v1/users/:id
// @access Private

const updateUser = asyncHandler(
  async (req: Request, res: Response) => {}
);

// @desc Delete a user
// @route DELETE /api/v1/users/:id
// @access Private

const deleteUser = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('Delete user');
  }
);

export { getAllUsers, createNewUser, updateUser, deleteUser };
