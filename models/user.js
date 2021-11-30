const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['POS', 'Admin'];
const HASH_ROUNDS = 10;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    default: 'Employee',
  },
  role: {
    type: String,
    enum: ROLES,
    default: 'POS',
  },
}, { timestamps: true });

UserSchema.pre('save', async function save(next) {
  const user = this;
  try {
    // only hash the password if it has been modified or is new
    if (!user.password) return next();
    // generate a salt
    const salt = await bcrypt.genSalt(HASH_ROUNDS);
    // hash the password
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

// export model user with UserSchema
module.exports = mongoose.model('user', UserSchema);
