import express from 'express';
const router = express.Router();

import {
  login,
  logout,
  refresh,
  register,
} from '../controllers/authController';
import verifyJWT from '../middleware/verifyJWT';
//controllers

router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.post('/register', register);

export default router;
