import express from 'express';
import usersController from '../controllers/users';
import jwtAuth from '../middlewares/jwtAuth';

const currentUserRoutes = express.Router();

currentUserRoutes.get('/',
  jwtAuth,
  usersController.currentUser)

export default currentUserRoutes;
