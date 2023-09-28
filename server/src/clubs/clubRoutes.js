'use strict';

import { listPaginated, list, createClub } from './clubController.js';
import express from 'express';
export const router = express.Router();

router.get('/clubs', async (req, res) => {
  try {
    const clubs = await listPaginated(req.query, req.cacheFavorites);
    res.json(clubs);
  } catch (error) {
    console.error();
  }
});

router.post('/clubs', async (req, res) => {
  try {
    const club = await createClub(req.body);
    res.json(club);
  } catch (error) {
    console.error();
  }
});
