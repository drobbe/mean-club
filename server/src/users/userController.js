'use strict';

import { User } from './userModel.js';
import { generateToken } from '../core/auth.js';
import { errorHandler } from '../../logger.js';
import bcrypt from 'bcrypt';

export function authenticate(req, res) {
  User.findOne({ username: req.body.username })
    .lean()
    .then((u) => {
      if (u === null) {
        return errorHandler(
          { message: 'Username or password is incorrect', status: 500 },
          req,
          res
        );
      }
      const isCorrecPassword = bcrypt.compareSync(
        req.body.password,
        u.password
      );

      if (u && isCorrecPassword) {
        u.token = generateToken(u);
        res.jsonp(u);
        updateLastAccess(u);
      } else {
        errorHandler(
          { message: 'Username or password is incorrect', status: 500 },
          req,
          res
        );
      }
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

export function register(req, res) {
  const user = new User(req.body);

  User.findOne({ username: user.username }).then((u) => {
    if (u) {
      errorHandler(
        {
          message: 'Username "' + user.username + '" is already taken',
          status: 500,
        },
        req,
        res
      );
    } else {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      user
        .save()
        .then((u) => res.json(u))
        .catch((error) => errorHandler(error, req, res));
    }
  });
}

export async function listUsers() {
  try {
    const users = new User(req.body);

    return users;
  } catch (error) {
    errorHandler(error, req, res);
  }
}

export async function addFavClub(club, user) {
  try {
    const currentUser = await User.updateOne(
      { username: user.username },
      { $push: { favorites: club } }
    );

    return currentUser;
  } catch (error) {
    errorHandler(error, req, res);
  }
}

export async function removeFavClub(club, user) {
  try {
    const currentUser = await User.updateOne(
      { username: user.username },
      { $pull: { favorites: club._id } }
    );

    return currentUser;
  } catch (error) {
    errorHandler(error, req, res);
  }
}

export async function updateLastAccess(user) {
  try {
    const filter = { _id: user._id };
    const update = { lastAccess: new Date() };

    await User.findOneAndUpdate(filter, update);
  } catch (error) {
    errorHandler(error, null, null);
  }
}
