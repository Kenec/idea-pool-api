import express from 'express';
import accessTokenController from '../controllers/accessTokens';

const accessTokensRoutes = express.Router();

accessTokensRoutes.post('/refresh', accessTokenController.refresh);

export default accessTokensRoutes;
