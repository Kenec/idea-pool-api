import express from 'express';
import userRoutes from './userRoutes';
import accessTokensRoutes from './accessTokensRoutes';
import currentUserRoutes from './currentUserRoutes';
import ideasRoutes from './ideasRoutes';

const routes = express.Router();

// user routes
routes.use('/users', userRoutes);
routes.use('/access-tokens', accessTokensRoutes);
routes.use('/me', currentUserRoutes);
routes.use('/ideas', ideasRoutes);

// Non existing Routes
routes.use('*', (req, res) => res.status(404).json({ message: 'Route Not Found!' }));

export default routes;
