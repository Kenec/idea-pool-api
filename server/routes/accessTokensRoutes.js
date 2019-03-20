import express from 'express';
import accessTokenController from '../controllers/accessTokens';
import accessTokenMiddleware from '../middlewares/accessTokens';
import userMiddleware from '../middlewares/user';

const accessTokensRoutes = express.Router();

accessTokensRoutes.post('/',
  userMiddleware.validateEmail,
  userMiddleware.validatePassword,
  accessTokenController.login);

accessTokensRoutes.post('/refresh',
  accessTokenMiddleware.validateRefreshToken,
  accessTokenController.refresh);

export default accessTokensRoutes;
