import express from 'express';
import usersController from '../controllers/users';
import userMiddleware from '../middlewares/user';

const userRoutes = express.Router();

userRoutes.post('/', 
  userMiddleware.validateName,
  userMiddleware.validateEmail,
  userMiddleware.validatePassword,
  userMiddleware.userExists,
  usersController.signup);

export default userRoutes;
