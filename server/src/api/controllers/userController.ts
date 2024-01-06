import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// @desc Get all users
// @route GET /api/v1/users
// @access Private/Admin
const getAllUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      exlude: ['password'],
    });
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.json(users);
  }
);

// @desc Create a user
// @route POST /api/v1/users
// @access public

const createNewUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, roles } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roles,
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid user data' });
    }

    res.status(201).json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
    });
  }
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
