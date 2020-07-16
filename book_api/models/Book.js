/**
 *  BOOK DATA MODEL
 * 
 *  BOOKs => author as nested schema? Or separate model?
 *  USERS
 * 
 *  1 BOOK - n USERS
 *  1 USER - n BOOKS
 *  Many - to - Many relationship
 */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// BOOK SCHEMA
const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true }
});
const Book = model('Book', BookSchema); // => books collection

module.exports = Book;

