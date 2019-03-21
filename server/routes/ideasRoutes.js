import express from 'express';
import ideasController from '../controllers/ideas';
import ideasMiddleware from '../middlewares/ideas';
import jwtAuth from '../middlewares/jwtAuth';

const ideasRoutes = express.Router();

ideasRoutes.get('/:page?', 
  jwtAuth, 
  ideasController.getIdea);

ideasRoutes.post('/',
  jwtAuth,
  ideasMiddleware.validateContent,
  ideasMiddleware.validateImpact,
  ideasMiddleware.validateEase,
  ideasMiddleware.validateConfidence,
  ideasController.create);

ideasRoutes.put('/:id', 
  jwtAuth, 
  ideasMiddleware.validateId,
  ideasMiddleware.validateContent,
  ideasMiddleware.validateImpact,
  ideasMiddleware.validateEase,
  ideasMiddleware.validateConfidence,
  ideasController.update);

ideasRoutes.delete('/:id',
  jwtAuth,
  ideasMiddleware.validateId,
  ideasController.delete);

export default ideasRoutes;
