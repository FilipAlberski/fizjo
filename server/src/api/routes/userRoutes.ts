import express from 'express';
const router = express.Router();
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import loginLimiter from '../middleware/loginLimiter';

//controllers
router.get('/', getAllUsers);
router.post('/', loginLimiter, createNewUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
