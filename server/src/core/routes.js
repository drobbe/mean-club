import express from 'express';
import { router as clubRoutes } from '../clubs/clubRoutes.js';
import { router as userRoutes } from '../users/userRoutes.js';

export const routesCore = express.Router();

routesCore.use(clubRoutes);
routesCore.use(userRoutes);

export default routesCore;
