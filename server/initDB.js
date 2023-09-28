'use strict';
import mongoose from 'mongoose';
import { Club } from './src/clubs/clubModel.js';

// it is called when starting

export const init = async function () {
  let nClubs = await Club.countDocuments();
  if (nClubs === 0) {
    //  si no hay clubs crea uno nuevo
    createDefaultClubs();
  }
};

export const createDefaultClubs = async function () {
  const Club = mongoose.model('Club');
  for (let i = 1; i <= 100; i++) {
    let club = new Club();
    club.name = 'Club ' + i;
    club.image = 'https://source.unsplash.com/random/400x600?sig=' + i;
    await club.save();
  }
  console.log('Create default clubs');
};
