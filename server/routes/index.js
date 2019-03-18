import express from 'express';
import userRoutes from './userRoutes';

const routes = express.Router();

// default routes
routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Idea Pool API' });
});

// user routes
routes.use('/users', userRoutes);

// Non existing Routes
routes.get('*', (req, res) => {
  res.status(404).json({ message: 'Route Not Found!' });
});

export default routes;
