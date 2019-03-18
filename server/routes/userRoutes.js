import express from 'express';

const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Signed up successfully' });
});

export default userRoutes;
