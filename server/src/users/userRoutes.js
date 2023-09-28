'use strict';

import {
  authenticate,
  register,
  listUsers,
  addFavClub,
  removeFavClub,
} from './userController.js';
import { Router } from 'express';

export const router = Router();

router.post('/users/authenticate', (req, res) => {
  return authenticate(req, res);
});

router.post('/users/register', (req, res) => {
  return register(req, res);
});

router.get('/users', async (req, res) => {
  try {
    const response = await listUsers();
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.put('/users/add-fav', async (req, res) => {
  try {
    const response = await addFavClub(req.body, req.user);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error });
  }
});

router.put('/users/remove-fav', async (req, res) => {
  try {
    const response = await removeFavClub(req.body, req.user);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error });
  }
});

export default router;
