import express from 'express';
const router = express.Router();
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

//controllers
router.get('/', getAllUsers);
router.post('/', createNewUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
