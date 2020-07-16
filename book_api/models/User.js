const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// USER SCHEMA
const UserSchema = new Schema({
  email: { type: String, required: true },
  pw: { type: String, required: true }, // hashed passwords
  username: String,
  books: [ { ref: 'Book', type: Schema.Types.ObjectId } ] // many-relationship to books
  // books: [bookId1, bookId2, ....]
});

// MODELS
const User = model('User', UserSchema); // => users collection

module.exports = User