// server/models/User.js
const mongoose = require('mongoose');
const md5 = require('md5');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true }, // Добавляем новое поле
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return md5(candidatePassword) === this.password;
};

userSchema.pre('save', function(next) {
  if (this.isModified('password') || this.isNew) {
    this.password = md5(this.password);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
