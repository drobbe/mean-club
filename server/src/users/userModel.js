import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  displayName: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    default: '',
  },
  username: {
    type: String,
    unique: 'testing error message',
    required: 'Please fill in a username',
    trim: true,
  },
  password: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastAccess: {
    type: Date,
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Club', default: [] }],
});

export const User = mongoose.model('User', UserSchema);
