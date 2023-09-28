'use strict';

import { Club } from './clubModel.js';
import { errorHandler } from '../../logger.js';

export const list = async function (req, res) {
  try {
    const clubs = await Club.find();

    return clubs;
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

export const listPaginated = async function (query, cache) {
  try {
    const { page, perpage, name, mode } = query;

    const filter =
      name === null ? {} : { name: { $regex: name, $options: 'i' } };

    if (mode === 'followed') {
      filter._id = { $in: cache };
    }

    if (mode === 'unfollowed') {
      filter._id = { $nin: cache };
    }

    const clubs = await Club.find(filter)
      .sort({ _id: -1 })
      .limit(perpage)
      .skip(perpage * page);

    return clubs;
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

export const createClub = async function ({ name, text }) {
  try {
    let club = new Club();
    club.name = name;
    club.text = text;
    club.image = `https://source.unsplash.com/random/400x600?${name}`;
    await club.save();
  } catch (err) {
    return errorHandler(err, req, res);
  }
};
